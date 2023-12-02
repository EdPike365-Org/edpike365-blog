import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

// run using `node ./.lighthouse/lighthouse-test.mjs`

// https://github.com/GoogleChrome/lighthouse/blob/main/readme.md#using-the-node-module
// https://github.com/GoogleChrome/lighthouse/blob/main/docs/readme.md#using-programmatically
// https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md
// https://github.com/GoogleChrome/lighthouse/blob/main/docs/user-flows.md
// https://github.com/cloudfour/lighthouse-parade
// https://github.com/github/lightcrawler
// https://github.com/GoogleChrome/lighthouse-ci

//const rootURL = 'http://localhost:8888'
const APP_ROOT_PATH = './.lighthouse'
// Define the path to the config file that describes which pages will be audited
const CONFIG_FILE_PATH = APP_ROOT_PATH + '/config.json'

// Define the path to the file that contains the list of URLs to be audited
const SITE_MAP_PATH = './public/sitemap-0.xml'

const getURLs = excludedLocs => {
  console.log('excluedLocs ' + excludedLocs)

  // Read XML data from file
  let xmlData = ''
  try {
    xmlData = fs.readFileSync(SITE_MAP_PATH, 'utf8')
  } catch (err) {
    console.error(
      `Error while reading SITE_MAP_PATH at ${SITE_MAP_PATH}: ${err}`
    )
    console.error(
      `This lighthouse process assumes that you installed gatsby-plugin-sitemap and ran 'gatsby build' to generate the file ${SITE_MAP_PATH}.`
    )
    throw err
  }

  // Parse XML data
  xml2js.parseString(xmlData, (err, result) => {
    if (err) {
      throw err
    }

    // Navigate to the 'url' elements and then to the 'loc' elements
    const urls = result.urlset.url

    // Extract the text content of each 'loc' element and add it to a list
    // TODO: filter out excludedLocs before returning
    const locList = urls.map(url => url.loc[0])

    // this is O(n^2)
    // const filteredLocList = locList.filter(val => !excludedLocs.includes(val))

    // this is O(n)
    const excludedLocsSet = new Set(excludedLocs)
    const filteredLocList = locList.filter(val => !excludedLocsSet.has(val))

    console.log(filteredLocList)

    return filteredLocList
  })
}

const getConfigFromFile = () => {
  // Read the config file
  const configContent = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8')

  // Parse the content of the config file
  const config = JSON.parse(configContent)

  return config
}

const clearReportDir = () => {
  const dirPath = path.join(APP_ROOT_PATH, 'reports')

  if (!fs.existsSync(dirPath)) {
    console.log(`${dirPath} does not exist, creating.`)
    fs.mkdirSync(dirPath)
    return
  }

  fs.rmSync(dirPath, { recursive: true })
  fs.mkdirSync(dirPath)
}

const config = getConfigFromFile()

// Extract the list of URLs from the config
const urls = getURLs(config.excludedLocations)

clearReportDir()

// Iterate over the list of URLs and run the lighthouse test for each URL
/*
for (url in urls) {
  //  const result = await lighthouse(url, options, chrome)
  // ... handle the result
}
*/

// added --no-sandbox because we are running in a container
// if you don't it will say it could not connect to the port
// and something like "environment variable CHROME_PATH must be set to executable of a build of Chromium"
const chrome = await chromeLauncher.launch({
  chromeFlags: ['--headless', '--no-sandbox'],
})

console.info(`Chrome debugging port running on ${chrome.port}`)

// options: https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md
const options = {
  logLevel: 'info',
  output: 'html',
  // onlyCategories: ['performance'],
  port: chrome.port,
}

try {
  const runnerResult = await lighthouse('https://www.edpike365.com', options)

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report
  //const reportJson = runnerResult.lhr
  const reportPath = './.lighthouse/reports/lhreport.html'
  fs.writeFileSync(reportPath, reportHtml)
  console.log(`Lighthouse report generated at ${reportPath}`)

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl)
  console.log(
    'Performance score was',
    runnerResult.lhr.categories.performance.score * 100
  )
} catch (error) {
  console.error('Error running Lighthouse:', error)
} finally {
  chrome.kill()
}
