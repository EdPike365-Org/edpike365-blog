import fs from 'fs'
import path from 'path'
import url from 'url'
import xml2js from 'xml2js'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

export const getURLXML = siteMapPath => {
  // Read XML data from file
  let xmlData = ''
  try {
    xmlData = fs.readFileSync(siteMapPath, 'utf8')
  } catch (err) {
    console.error(`Error while reading SITE_MAP_PATH at ${siteMapPath}: ${err}`)
    console.error(
      `This lighthouse process assumes that you installed gatsby-plugin-sitemap and ran 'gatsby build' to generate the file ${siteMapPath}.`
    )
    throw err
  }
  return xmlData
}

export const getURLs = (excludedLocs, xmlData) => {
  let filteredLocList = []

  // Parse XML data to json list
  xml2js.parseString(xmlData, (err, result) => {
    if (err) {
      throw err
    }

    // Navigate to the 'url' elements and then to the 'loc' elements
    // get back an array of objects
    const urlObjects = result.urlset.url

    // Extract the text content of each 'loc' element and put it in an array
    const locArray = urlObjects.map(url => url.loc[0])

    // this is O(n^2)
    //filteredLocList = locArray.filter(val => !excludedLocs.includes(val))

    // this is O(n)
    const excludedLocsSet = new Set(excludedLocs)
    filteredLocList = locArray.filter(val => !excludedLocsSet.has(val))
  })

  return filteredLocList
}

export const replaceDomains = (newDomain, urls) => {
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

export const getConfigFromFile = configFilePath => {
  // Read the config file
  const configContent = fs.readFileSync(configFilePath, 'utf-8')

  // Parse the content of the config file
  const config = JSON.parse(configContent)

  return config
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

export async function runReports(urls) {
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
