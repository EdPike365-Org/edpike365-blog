import {
  runReports,
  getConfigFromFile,
  getURLs,
  clearReportDir,
} from './lighthouse-utils.mjs'

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

const config = getConfigFromFile(CONFIG_FILE_PATH)

// Extract the list of URLs from the config
const urls = getURLs(config.excludedLocations, SITE_MAP_PATH)

clearReportDir(APP_ROOT_PATH)

runReports(urls)
