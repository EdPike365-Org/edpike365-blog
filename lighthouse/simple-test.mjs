import fs from 'fs'
import path from 'path'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

// this is a simple stand alone script to run lighthouse with no extra dependencies
// useful for testing chrome and lighthouse because they are not installed globally
// Modified from https://github.com/GoogleChrome/lighthouse/blob/main/docs/readme.md#using-programmatically

// node ./lighthouse/simple-test.mjs

const appRoot = './lighthouse'

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

// remember, the settings subsection found in at least one major tutorial appears to not work
// If you put output or onlyCategories in it, they are ignored
// we set port to chrome.port, because chromeLauncher.launch returns grabs a random available port
// name, description, and reportRootDir are custom settings and ignored by lighthouse
// add onlyCategories: ['performance'], here to limit the categories. remember to check for null for each category
let lighthouseOptions = {
  name: 'Desktop Performance',
  description: 'emulatedFormFactor: desktop',
  reportRootDir: 'desktop',
  extends: 'lighthouse:default',
  logLevel: 'info',
  output: ['html', 'json'],
  port: chrome.port,
}

const result = await lighthouse('https://www.edpike365.com', lighthouseOptions)

// `.report[0]` is the HTML report as a string, its 0 because its the first output type
const reportHtml = result.report[0]
const htmlFilePath = path.join(appRoot, 'simple-test-lhreport.html')
fs.writeFileSync(htmlFilePath, reportHtml)

const reportJSON = result.report[1]
const jsonFilePath = path.join(appRoot, 'simple-test-lhreport.json')
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
