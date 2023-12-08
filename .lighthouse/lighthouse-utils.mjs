import fs from 'fs'
import { fetchURLAsString } from './utils.mjs'
import path from 'path'
import url from 'url'
import xml2js from 'xml2js'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

export const getConfigFromFile = configFilePath => {
  const configContent = fs.readFileSync(configFilePath, 'utf-8')
  const config = JSON.parse(configContent)
  return config
}

export const getSiteMapXML = async (domain, siteMapFilePath) => {

  let xmlData = ''

  if (!siteMapFilePath) {

    // TODO read the sitemap-index.file and parse it to get ALL of the sitemap files
    // assuming only 1 here
    const siteMapURL = domain + '/sitemap-0.xml'

    console.info(
      'siteMapFilePath is null, getting site map using ' + siteMapURL
    )

    try {

      xmlData = await fetchURLAsString(siteMapURL)

    } catch (err) {
      console.error(`Error while getting sitemap file at ${siteMapURL}: ${err}`)
      throw err
    }

  } else {

    // if they supplied a siteMapFilePath, use that
    try {
      xmlData = fs.readFileSync(siteMapFilePath, 'utf8')
    } catch (err) {
      console.error(
        `Error while reading sitemap file at ${siteMapFilePath}: ${err}`
      )
      console.error(
        `This lighthouse process assumes that you installed gatsby-plugin-sitemap and ran 'gatsby build' to generate the file ${siteMapFilePath}.`
      )
      throw err
    }
  }

  return xmlData

}

export const getURLsFromXML = (domain, xmlData) => {
  // the domain is not in the sitemap, so prepend it
  let urls = [domain]

  // Parse XML data to json list
  xml2js.parseString(xmlData, (err, result) => {
    if (err) {
      throw err
    }

    // Navigate to the 'url' elements and then to the 'loc' elements
    // get back an array of objects
    const urlObjects = result.urlset.url

    // Extract the text content of each 'loc' element and put it in an array
    urls = urlObjects.map(url => url.loc[0])
  })

  return urls
}

export const getFilteredURLs = (urls, excludedURLs) => {
  // this is O(n^2)
  //filteredURLs = locArray.filter(val => !excludedURLs.includes(val))

  // this is O(n)
  const excludedURLsSet = new Set(excludedURLs)
  return urls.filter(val => !excludedURLsSet.has(val))
}

export const replaceDomains = (urls, newDomain) => {
  if (urls.length === 0) {
    console.log('no urls to replace')
    return urls
  }

  const sampleURL = new URL(urls[0])
  const oldDomain = sampleURL.protocol + '//' + sampleURL.hostname
  console.log(
    `replacing all oldDomains of ${oldDomain} with supplied new domain ${newDomain}`
  )

  const newURLs = urls.map(eachURL => {
    return eachURL.replace(oldDomain, newDomain)
  })
  return newURLs
}

export const clearReportDir = appRootPath => {
  const dirPath = path.join(appRootPath, 'reports')

  if (!fs.existsSync(dirPath)) {
    console.log(`${dirPath} does not exist, creating.`)
    fs.mkdirSync(dirPath)
    return
  }

  fs.rmSync(dirPath, { recursive: true })
  fs.mkdirSync(dirPath)
}

export const getLightHouseOptions = (chrome) => {

  // TODO: add to config file and pass in
  // OR create a seperate config file for lighthouse because thats how it works from the CLI normally
  // options: https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md
  // https://github.com/GoogleChrome/lighthouse/tree/master/lighthouse-core/config
  const lighthouseOptions = {
    extends: 'lighthouse:default',
    settings: {
      logLevel: 'info',
      output: ['html', 'json'],
      // onlyCategories: ['performance'],
      port: chrome.port,
    },
  }

  return lighthouseOptions

}

export async function runReports(urls, numURLsToProcess) {

  let chrome = null

  try {
    // Chrome seems to be running out of memory even running one url at a time
    // Seems to be related to running puppeteer headless in Docker
    // https://github.com/puppeteer/puppeteer/issues/1834
    // https://github.com/GoogleChrome/lighthouse/issues/6512
    /*
        return await launch({
        chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
        logLevel: 'info',
        chromePath: '/usr/bin/google-chrome'
    })
    */
    // added --no-sandbox because we are running in a container
    // if you don't it will say it could not connect to the port
    // and something like "environment variable CHROME_PATH must be set to executable of a build of Chromium"

    const chrome = await chromeLauncher.launch({
      chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
    })

    // we did not pass in a port for headless chrome to run on, so we need to get it from chrome
    console.info(`Chrome debugging port running on ${chrome.port}`)

    //const lighthouseOptions = getLightHouseOptions(chrome)
    const lighthouseOptions = {
      extends: 'lighthouse:default',
      settings: {
        logLevel: 'info',
        output: ['html', 'json'],
        // onlyCategories: ['performance'],
        port: chrome.port,
      },
    }

    if (numURLsToProcess > -1) {
      urls = urls.slice(0, numURLsToProcess)
    }

    //console.log('urls ' + urls)

    // Iterate over the list of URLs and run the lighthouse test for each URL
    for (const thisURL of urls) {
      await runSingleReport(thisURL, lighthouseOptions)
    }
  } catch (error) {
    console.error('Error running Lighthouse:', error)
  } finally {
    if (chrome !== null && chrome !== undefined) {
      console.info('Killing Chrome')
      await chrome.kill()
    } else {
      console.warn('Chrome was null, so it was not killed.')
      process.exit(0)
    }
  }
}

const getReportFileName = (urlString) => {
  const urlObject = new url.URL(urlString)
  let reportFileName = urlObject.pathname

  // generate index page report file name
  if (reportFileName === '/') {
    reportFileName = 'index'
  }

  reportFileName = reportFileName.replace(/\//g, '')
  reportFileName = reportFileName + '.html'

  return reportFileName
}

const runSingleReport = async (thisURL, lighthouseOptions) => {

  console.log('thisURL ' + thisURL)
  //  const result = await lighthouse(url, options, chrome)

  const runnerResult = await lighthouse(thisURL, lighthouseOptions)

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for ', thisURL)
  console.log('finalDisplayedUrl ', runnerResult.lhr.finalDisplayedUrl)
  console.log(
    'Performance score was',
    runnerResult.lhr.categories.performance.score * 100
  )

  const reportFileName = getReportFileName(thisURL)

  const reportPath = path.join('./.lighthouse/reports/', reportFileName)

  const reportHtml = runnerResult.report
  fs.writeFileSync(reportPath, reportHtml)
  console.log(`Lighthouse report HTML generated at ${reportPath}`)
}

export async function runReportsOLD(urls) {
  let chrome = null

  try {
    // Chrome seems to be running out of memory even running one url at a time
    // Seems to be related to running puppeteer headless in Docker
    // https://github.com/puppeteer/puppeteer/issues/1834
    // https://github.com/GoogleChrome/lighthouse/issues/6512
    /*
        return await launch({
        chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
        logLevel: 'info',
        chromePath: '/usr/bin/google-chrome'
    })
    */
    // added --no-sandbox because we are running in a container
    // if you don't it will say it could not connect to the port
    // and something like "environment variable CHROME_PATH must be set to executable of a build of Chromium"

    const chrome = await chromeLauncher.launch({
      chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
    })

    console.info(`Chrome debugging port running on ${chrome.port}`)

    // options: https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md
    const options = {
      logLevel: 'info',
      output: 'html',
      // onlyCategories: ['performance'],
      port: chrome.port,
    }

    console.log('urls ' + urls)

    // Iterate over the list of URLs and run the lighthouse test for each URL
    for await (const thisURL of urls) {
      console.log('thisURL ' + thisURL)
      //  const result = await lighthouse(url, options, chrome)

      const runnerResult = await lighthouse(thisURL, options)

      // `.lhr` is the Lighthouse Result as a JS object
      console.log('Report is done for ', thisURL)
      console.log('finalDisplayedUrl ', runnerResult.lhr.finalDisplayedUrl)
      console.log(
        'Performance score was',
        runnerResult.lhr.categories.performance.score * 100
      )

      const urlObject = new url.URL(thisURL)
      let reportFileName = urlObject.pathname
      if (reportFileName === '/') {
        reportFileName = 'index'
      }
      reportFileName = reportFileName.replace(/\//g, '')
      reportFileName = reportFileName + '.html'
      const reportPath = path.join('./.lighthouse/reports/', reportFileName)

      const reportHtml = runnerResult.report
      fs.writeFileSync(reportPath, reportHtml)
      console.log(`Lighthouse report HTML generated at ${reportPath}`)
    }
  } catch (error) {
    console.error('Error running Lighthouse:', error)
  } finally {
    if (chrome !== null && chrome !== undefined) {
      console.info('Killing Chrome')
      await chrome.kill()
    } else {
      console.warn('Chrome was null, so it was not killed.')
      process.exit(0)
    }
  }
}
