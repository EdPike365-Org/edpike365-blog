import path from 'path'
import {
  getSiteMapXML,
  getURLsFromXML,
  getFilteredURLs,
  replaceDomains,
  runReports,
  getChromeOptions,
} from './utils-lighthouse.mjs'
import { getJSONFromFile } from './utils.mjs'

// https://www.smashingmagazine.com/2020/09/introduction-running-lighthouse-programmatically/
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
//const config = getConfigFromFile(configFilePath)
const config = getJSONFromFile(configFilePath)

//console.log('indexFile = ' + process.argv[1])

// domain is required
// If different from domain in sitemap, will override the domain in the sitemap
// Sitemap is typically generated using the production domain value
// So this is useful local testing, for example 'http://localhost:8888'
let domain = config.domain

// -1 means process all
let numURLsToProcess = config.numURlsToProcess ? config.numURlsToProcess : -1
let excludedURLs = config.excludedURLs ? config.excludedURLs : []

console.log("********** lighthouse-batch.mjs **********")

// Command line args
process.argv.forEach(function (val, index, array) {
  if (val.indexOf('domain') > -1) {
    // Override the domain in the config file
    domain = val.substring(val.indexOf('=') + 1)
    console.log('\t CLI override domain = ' + domain)
  } else if (val.indexOf('numURLsToProcess') > -1) {
    // Override number of URLs to process
    numURLsToProcess = val.substring(val.indexOf('=') + 1)
    console.log('\t CLI override numURLsToProcess = ' + numURLsToProcess)
  }
})

if (!domain) {
  console.error('domain arg from config and CLI is empty, cannot continue')
  process.exit(1)
}

const siteMapFilePath = config.siteMapFilePath ? config.siteMapFilePath : null

/*
console.log('domain = ' + domain)
console.log('numURLsToProcess = ' + numURLsToProcess)
console.log('excludedURLs = ' + JSON.stringify(excludedURLs, null, 2))
console.log('siteMapFilePath = ' + siteMapFilePath)
*/

console.log("----------------- end config --------------------------")

const siteMapXML = await getSiteMapXML(domain, siteMapFilePath)

if (siteMapXML === '') {
  console.error('siteMapXML is empty')
  process.exit(1)
}

const targetURLs = getURLsFromXML(domain, siteMapXML)
let filteredURLs = getFilteredURLs(targetURLs, excludedURLs)
/*
filteredURLs = [
  "http://localhost:8888/",
  "http://localhost:8888/blog/jenkins-in-docker/",
  //"http://localhost:8888/blog/jenkins-in-docker.jsp/",
  //"http://localhost:8888/blog/jenkins-in-docker.jsp",
]
*/

// Replace the domain in the URLs with the one specified in the config file
let urls = replaceDomains(filteredURLs, domain)

const chromeOpts = getChromeOptions()

// we have 1 or more lighthouse config sets
const lighthouseOptionsArray = getJSONFromFile(APP_ROOT_PATH + '/lighthouse-configs.json')

const allReportsRootPath = path.join(APP_ROOT_PATH, 'reports')

await runReports(allReportsRootPath, urls, numURLsToProcess, chromeOpts, lighthouseOptionsArray)

console.log('Lighthouse Batch Done')
process.exit(0)
