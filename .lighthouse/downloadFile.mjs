import { fetchURLAsString } from './utils.mjs'

const downloadUrl = process.argv[2]
if (!downloadUrl) {
  console.error('Please provide a URL as a command line argument.')
  process.exit(1)
}

const xmlText = await fetchURLAsString(downloadUrl)

console.log(xmlText)
