import fs, { write } from 'fs'
import { clearDirAndRemake, fetchURLAsString, wait } from './utils.mjs'
import path from 'path'
import url from 'url'
import xml2js from 'xml2js'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import { report } from 'process'

export const getSiteMapXML = async (domain, siteMapFilePath) => {

  let xmlData = ''

  if (!siteMapFilePath) {

    // TODO read the sitemap-index.file and parse it
    // it has a list of sitemap files, but we are
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
  // host is hostname + port
  let oldDomain = sampleURL.protocol + '//' + sampleURL.host
  /*
  if(sampleURL.port){
    oldDomain += ':' + sampleURL.port
  }
  */
  console.log(
    `replacing all oldDomains of ${oldDomain} with supplied new domain ${newDomain}`
  )

  const newURLs = urls.map(eachURL => {
    return eachURL.replace(oldDomain, newDomain)
  })
  return newURLs
}

export const clearReportDir = (allReportsRootPath, reportRootDir) => {
  const dirPath = path.join(allReportsRootPath, reportRootDir)
  clearDirAndRemake(dirPath)
}

export async function runReports(allReportsRootPath, urls, numURLsToProcess, chromeOpts, lighthouseOptionsArray) {

  const lighthouseOptions = {
    name: "Desktop Performance",
    description: "emulatedFormFactor: desktop",
    reportRootDir: "desktop",
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['accessibility'],
      emulatedFormFactor:'desktop',
      output: ['html'],
    },
    logLevel: "error",
  }

  //for (const lighthouseOptions of lighthouseOptionsArray.optionSets) {
    console.log("\n****** Starting Lighthouse Report ******");
    console.log("name:" + lighthouseOptions.name);
    console.log("\t description:", lighthouseOptions.description);
    console.log("\t reportRootDir:", lighthouseOptions.reportRootDir);
    clearReportDir(allReportsRootPath, lighthouseOptions.reportRootDir)
    await runReportSet(lighthouseOptions, chromeOpts, urls, numURLsToProcess);

 // }
}

export async function runReportSet(lighthouseOptions, chromeOpts, urls, numURLsToProcess) {

  let chrome = null

  try {

    chrome = await chromeLauncher.launch(chromeOpts)

    // we did not pass in a port for headless chrome to run on, so we need to get it from chrome
    console.info(`\tChrome debug port: ${chrome.port}`)
    lighthouseOptions.port = chrome.port

    if (numURLsToProcess > -1) {
      urls = urls.slice(0, numURLsToProcess)
    }

    console.log('\t lighthouseOptions: ', JSON.stringify(lighthouseOptions, null, 2))

    // Iterate over the list of URLs and run the lighthouse test for each URL
    for (const thisURL of urls) {
      await runSingleReport(thisURL, lighthouseOptions)
    }
    await wait(1500);
  } catch (error) {
    console.error('Error running Lighthouse:', error)
  } finally {
    if (chrome) {
      console.info('Killing Chrome')
      chrome.kill()
    }
  }
}

const runSingleReport = async (thisURL, lighthouseOptions) => {

  console.log('URL: ' + thisURL)
  const result = await lighthouse(thisURL, lighthouseOptions)
  recordReportResults(result, thisURL, lighthouseOptions.reportRootDir)

}

const recordReportResults = (result, thisURL, reportRootDir) => {

  if(!result) {
    console.error('lighthouse result is null')
    return
  }

  if (result.lhr.runtimeError) {
    console.error(result.lhr.runtimeError.message)
    return
  }

  printResultsToTerminal(result)
  writeReportToFile(result, thisURL, reportRootDir)

}

const printResultsToTerminal = (result) => {

  // TODO: where is .lhr?
  //const title = results.categories.accessibility.title;
  //const score = results.categories.accessibility.score * 100;

  // TODO: verify that this might be diff from URL passed in if it was redirected
  console.log('\t finalDisplayedUrl ', result.lhr.finalDisplayedUrl)
  console.log('\t Perf: ', result.lhr.categories.performance.score * 100 )
  console.log('\t Accessibility: ', result.lhr.categories.accessibility.score * 100 )
  console.log('\t Best Practices: ', result.lhr.categories['best-practices'].score * 100 )
  console.log('\t SEO: ', result.lhr.categories.seo.score * 100 )
}

const writeReportToFile = (result, urlString, reportRootDir) => {
  const reportFilePath = getReportFilePathFromURL(urlString, reportRootDir)
  makeDirPathForFilePath(reportFilePath)

  // report[0] is the HTML report
  const reportHtml = result.report[0]
  console.log(`\t Report HTML length: ${reportHtml.length}`)
  fs.writeFileSync(reportFilePath, reportHtml)
  console.log(`\t Report HTML at: ${reportFilePath}`)
}

const makeDirPathForFilePath = (filePath) => {
  // make sure sub dirs exist
  fs.mkdirSync(path.dirname(filePath), { recursive: true }, error => {
    if (error) console.error('error creating directory', error);
  });
}

export const getChromeOptions = () => {

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
  // and something like "environment variable CHROME_PATH must be set to executable of a build of Chromium"}

  const chromeOpts = {
    chromeFlags: [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
    ],
  }
  return chromeOpts
}


export const getReportFilePathFromURL = (urlString, reportRootDir) => {
  //console.log('getFolderPathFromURL: urlString before change = ' + urlString)

  const urlObject = new URL(urlString);
  //console.log('getFolderPathFromURL: urlObject.pathname = ' + urlObject.pathname)
  let pathName = urlObject.pathname;
  // remove the trailing slash if it exists, as in /blog/jenkins-in-docker/
  pathName.endsWith('/') ? pathName = pathName.slice(0, -1) : pathName = pathName;
  //console.log('getFolderPathFromURL: pathName after remove trailing slash = ' + pathName)
  //console.log('getFolderPathFromURL: pathName file extension = ' + path.extname(pathName))
  // remove the file extension, as in .jsp
  path.extname(pathName) ? pathName = pathName.slice(0, -path.extname(pathName).length) : pathName = pathName;
  //console.log('getFolderPathFromURL: pathName after remove file extension = ' + pathName)

  // if this was the site root, then the pathName will be empty, so set it to index
  if (pathName === '') {
    pathName = 'index'
  }
  pathName += ".html"

  const reportFilePath = path.join('./.lighthouse/reports/', reportRootDir, pathName)
  //console.log('getFolderPathFromURL: reportFilePath = ' + reportFilePath)
  return reportFilePath;
   //reportFileName = reportFileName.replace(/\//g, '')
   // reportFileName = reportFileName + '.html'

  //const reportFileName = getReportFileName(urlString)
  //const reportFilePath = path.join(reportFileDir, reportFileName)

  // create an array of the path parts, as in [ '', 'blog', 'jenkins-in-docker' ]
  //const pathParts = pathName.split('/');
  //console.log('getFolderPathFromURL: pathParts = ' + pathParts)

  //let folderPath = '';

  // get the last part of the path, which is the file name, even if it has a query string or / at the end
  //

//https://2ality.com/2022/07/nodejs-path.html#converting-between-urls-and-file-paths
  // Remove duplicate slashes
  //const normalizedPath = path.normalize(filePath);

  // Replace slashes with path separator
  //folderPath = folderPath.replace(/\//g, path.sep);

  // Remove leading slash if it exists
  //if (folderPath.startsWith(path.sep)) {
   // folderPath = folderPath.slice(1);
 // }

  // Remove trailing slash if it exists


  //console.log('getFolderPathFromURL: folderPath = ' + folderPath)
  //return folderPath;

}

/*
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
*/
//TODO implement pass fail logic
function passOrFailA11y(results, optionSet, chrome) {
  const targetA11yScore =  95;
  const { windowSize } = optionSet;
  const accessibilityScore = results.categories.accessibility.score * 100;
  if (accessibilityScore) {
    if (windowSize === 'desktop') {
      if (accessibilityScore < targetA11yScore) {
        console.error(`Target accessibility score: ${targetA11yScore}, current accessibility score ${accessibilityScore}`);
        chrome.kill();
        process.exitCode = 1;
      }
    }
    if (windowSize === 'mobile') {
      if (accessibilityScore < targetA11yScore) {
        console.error(`Target accessibility score: ${targetA11yScore}, current accessibility score ${accessibilityScore}`);
        chrome.kill();
        process.exitCode = 1;
      }
    }
  }
}

