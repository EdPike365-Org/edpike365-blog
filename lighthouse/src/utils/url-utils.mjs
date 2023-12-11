import path from 'path'

// take a normal URL or Router style URL and return a file name sans extension
export const getFileNameSansExt = urlPathName => {
  // remove the trailing slash if it exists, as in a react style page "/blog/jenkins-in-docker/"
  if (urlPathName.endsWith('/')) {
    urlPathName = urlPathName.slice(0, -1)
  }

  // divide the path into parts at slashes
  const pathParts = urlPathName.split('/')
  let fileName = pathParts[pathParts.length - 1]

  // get the last part of the path, which is the file name
  fileName = path.basename(urlPathName)

  // remove the file extension, as in .jsp
  if (path.extname(fileName)) {
    fileName = fileName.slice(0, -path.extname(fileName).length)
  }

  // if this was the site root, then the pathName will be empty, so set it to index
  if (fileName === '') {
    fileName = 'index'
  }

  return fileName
}

// take a normal URL or Router style URL and return any subdirectories
export const getSubDirs = urlPathName => {
  // remove the trailing slash if it exists, as in a react style page "/blog/jenkins-in-docker/"
  if (urlPathName.endsWith('/')) {
    urlPathName = urlPathName.slice(0, -1)
  }

  // if there is nothing left, this was the site index file, return nothing
  if (urlPathName === '') {
    return ''
  }

  // remove the last part, which is the file name
  const pathParts = urlPathName.split('/')
  pathParts.pop()

  // if there is nothing left, this was a page in the site root, return nothing
  if (pathParts.length === 0) {
    return ''
  }

  // join the parts back together to make the subdirectory path
  const subDirPath = pathParts.join('/')

  return subDirPath
}
