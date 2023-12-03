import {
  runReports,
  getConfigFromFile,
  getURLXML,
  getURLs,
  replaceDomains,
  clearReportDir,
} from './lighthouse-utils.mjs'

// run using `node ./.lighthouse/lighthouse-test.mjs`
let domain = ''
process.argv.forEach(function (val, index, array) {
  if (val.indexOf('domain') > -1) {
    domain = val.substring(val.indexOf('=') + 1)
  }
})
console.log('domain override = ' + domain)

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

const config = getConfigFromFile(CONFIG_FILE_PATH)

const urlsXML = getURLXML(SITE_MAP_PATH)
let urls = getURLs(config.excludedLocations, urlsXML)

if (domain !== '') {
  urls = replaceDomains(domain, urls)
}

clearReportDir(APP_ROOT_PATH)

urls = [
  'http://localhost:8888',
  'http://localhost:8888/about-me-now/',
  'http://localhost:8888/about-me-past/',
]

runReports(urls)
