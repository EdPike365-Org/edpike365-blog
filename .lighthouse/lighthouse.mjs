import fs from 'fs'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

// run using `node ./.lighthouse/lighthouse-test.mjs`
let chrome = null
try {
  // added --no-sandbox because we are running in a container
  // if you don't it will say it could not connect to the port
  chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox'],
  })

  const options = {
    logLevel: 'info',
    output: 'html',
    // onlyCategories: ['performance'],
    port: chrome.port,
  }

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
  console.log(error)
} finally {
  await chrome.kill()
}
