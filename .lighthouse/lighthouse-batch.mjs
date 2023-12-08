import {
  getConfigFromFile,
  getSiteMapXML,
  getURLsFromXML,
  getFilteredURLs,
  replaceDomains,
  clearReportDir,
  runReports,
  getLightHouseOptions,
} from './lighthouse-utils.mjs'

/*
1. Make sure the target domain is running.
   If using Gatsby and Netlify, recommend running:
   netlify build && netlify serve
2. run using:
  node ./.lighthouse/lighthouse-batch.mjs
  node ./.lighthouse/lighthouse-batch.mjs --numURLsToProcess=2 --domain=http://localhost:8888
*/

const APP_ROOT_PATH = './.lighthouse'

const configFilePath = APP_ROOT_PATH + '/config.json'
const config = getConfigFromFile(configFilePath)

//indexFile = /workspace/edpike365-blog/.lighthouse/lighthouse-batch.mjs
//console.log('indexFile = ' + process.argv[1])

// domain is required
// If different from domain in sitemap, will override the domain in the sitemap
// Sitemap is typically generated using the production domain value
// So this is useful local testing, for example 'http://localhost:8888'
let domain = config.domain
// -1 means process all
let numURLsToProcess = config.numURlsToProcess ? config.numURlsToProcess : -1
let excludedURLs = config.excludedURLs ? config.excludedURLs : []

// Command line args
process.argv.forEach(function (val, index, array) {
  if (val.indexOf('domain') > -1) {
    // Override the domain in the config file
    domain = val.substring(val.indexOf('=') + 1)
    console.log('CLI override domain = ' + domain)
  } else if (val.indexOf('numURLsToProcess') > -1) {
    // Override number of URLs to process
    numURLsToProcess = val.substring(val.indexOf('=') + 1)
    console.log('CLI override numURLsToProcess = ' + numURLsToProcess)
  }
})

if (!domain) {
  console.error('domain from config and CLI is empty, cannot continue')
  process.exit(1)
}

const siteMapFilePath = config.siteMapFilePath ? config.siteMapFilePath : null

console.log('domain = ' + domain)
console.log('numURLsToProcess = ' + numURLsToProcess)
console.log('excludedURLs = ' + JSON.stringify(excludedURLs, null, 2))
console.log('siteMapFilePath = ' + siteMapFilePath)

const siteMapXML = await getSiteMapXML(domain, siteMapFilePath)

if (siteMapXML === '') {
  console.error('siteMapXML is empty')
  process.exit(1)
}

console.log('siteMapXML = ' + siteMapXML)

const targetURLs = getURLsFromXML(domain, siteMapXML)
const filteredURLs = getFilteredURLs(targetURLs, excludedURLs)

// Replace the domain in the URLs with the one specified in the config file
let urls = replaceDomains(filteredURLs, domain)

clearReportDir(APP_ROOT_PATH)

/*
urls = [
  'http://localhost:8888',
  'http://localhost:8888/about-me-now/',
  'http://localhost:8888/about-me-past/',
]
*/

runReports(urls, numURLsToProcess)
