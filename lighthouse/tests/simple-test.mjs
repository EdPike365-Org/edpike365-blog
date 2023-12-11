import fs from 'fs'
import path from 'path'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import * as fsUtils from '../src/utils/fs-utils.mjs'
import * as urlUtils from '../src/utils/url-utils.mjs'

// this is a simple stand alone script to run lighthouse with no extra dependencies
// useful for testing chrome and lighthouse because they are not installed globally
// Modified from https://github.com/GoogleChrome/lighthouse/blob/main/docs/readme.md#using-programmatically

// node ./lighthouse/simple-test.mjs

console.log('cwd = ', process.cwd())
const appRoot = '.'
let targetURL = 'https://www.edpike365.com'
// let targetURL = "https://www.edpike365.com/edpike365-about-site/"
// let targetURL = "https://www.edpike365.com/blog/jenkins-in-docker/"

console.log('********** Lighthouse simple-test.mjs **********')
// Command line args
process.argv.forEach(function (val, index, array) {
  if (val.indexOf('target') > -1) {
    // Override the domain in the config file
    targetURL = val.substring(val.indexOf('=') + 1)
    console.log('\t CLI override targetURL with target=' + targetURL)
  }
})

// prepare the report folder
const reportDirPath = path.join(appRoot, 'reports/simple-test/')

// had to add more flags to get it to work in docker
const chromeOpts = {
  chromeFlags: [
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
  ],
}

const chrome = await chromeLauncher.launch(chromeOpts)

// Remember, the settings subsection found in at least one major tutorial appears to not work
// If you put output or onlyCategories in it, they are ignored.
// We set port to chrome.port, because chromeLauncher.launch returns grabs a random available port
// Name, description, and reportRootDir are custom settings and ignored by lighthouse
// Add onlyCategories: ['performance'], here to limit the categories.
// Remember to check for null for each category when reporting, because they may not exist
let lighthouseOptions = {
  name: 'Desktop Performance',
  description: 'emulatedFormFactor: desktop',
  reportRootDir: 'desktop',
  extends: 'lighthouse:default',
  logLevel: 'info',
  output: ['html', 'json'],
  port: chrome.port,
}

// get subfolders and file names from URL
const urlObject = new URL(targetURL)

const urlDirPath = urlUtils.getSubDirs(urlObject.pathname)
console.log('urlDirPath = ', urlDirPath)

// prepare the report folder
const urlReportPath = path.join(reportDirPath, urlDirPath)
fsUtils.makeDirsForDirPathSafe(urlReportPath)

// get file name sans ext from URL, use it for the report file names
let fileName = urlUtils.getFileNameSansExt(urlObject.pathname)

// add a timestamp to it
const timestamp = Date.now().toLocaleString()
fileName = `${fileName}_${timestamp}`
console.log('fileName = ', fileName)

let ext = '.html'
const htmlFileName = fileName + ext
const htmlFilePath = path.join(urlReportPath, htmlFileName)
console.log('htmlFilePath = ', htmlFilePath)

ext = '.json'
const jsonFileName = fileName + ext
const jsonFilePath = path.join(urlReportPath, jsonFileName)
console.log('jsonFilePath = ', jsonFilePath)

const result = await lighthouse(targetURL, lighthouseOptions)
// `.report[0]` is the HTML report as a string, its 0 because its the first output type
const reportHtml = result.report[0]
fs.writeFileSync(htmlFilePath, reportHtml)

const reportJSON = result.report[1]
fs.writeFileSync(jsonFilePath, reportJSON)

// `.lhr` is the Lighthouse Result as a JS object
console.log('URL: ', result.lhr.finalDisplayedUrl)

result.lhr.categories.performance &&
  console.log('\t Perf: ', result.lhr.categories.performance.score * 100)

result.lhr.categories.accessibility &&
  console.log(
    '\t Accessibility: ',
    result.lhr.categories.accessibility.score * 100
  )

result.lhr.categories['best-practices'] &&
  console.log(
    '\t Best Practices: ',
    result.lhr.categories['best-practices'].score * 100
  )

result.lhr.categories.seo &&
  console.log('\t SEO: ', result.lhr.categories.seo.score * 100)

await chrome.kill()
