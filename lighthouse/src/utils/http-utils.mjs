import http from 'http'
import https from 'https'
import { URL } from 'url'

export const fetchURLAsString = async downloadUrl => {
  const res = await fetch(downloadUrl)
    .then(response => response.text())
    .catch(error => {
      console.error(error)
      throw error
    })

  return res
}

export const downloadURLAsString = downloadUrl => {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(downloadUrl)
    const httpOrHttps = parsedUrl.protocol === 'https:' ? https : http

    let fileContent = ''

    httpOrHttps
      .get(downloadUrl, response => {
        if (response.statusCode !== 200) {
          console.error(
            `Failed to download file from ${downloadUrl}. Status code: ${response.statusCode}`
          )
          process.exit(1)
        }
        // Ensure the response is treated as text
        // otherwise it's a buffer and we'd have to do response.toString()
        response.setEncoding('utf8')
        response.on('data', chunk => {
          fileContent += chunk
        })

        response.on('end', () => {
          //console.log(`Downloaded file from ${downloadUrl}`)
          resolve(fileContent)
          //return fileContent
        })
      })
      .on('error', err => {
        console.error(`Error downloading file: ${err.message}`)
        reject(err)
      })
  })
}
