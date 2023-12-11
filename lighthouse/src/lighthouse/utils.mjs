// this will remove the domain and the trailing slash
// eg: http://localhost:8888/blog/jenkins-in-docker/ becomes dirPath "blog" and /jenkins-in-docker"
export const getFilePathFromURL = (urlString, reportRootDir) => {
  console.log('getFolderPathFromURL: urlString before change = ' + urlString)

  const urlObject = new URL(urlString)
  //console.log('getFolderPathFromURL: urlObject.pathname = ' + urlObject.pathname)
  let pathName = urlObject.pathname
  // remove the trailing slash if it exists, as in a react style page "/blog/jenkins-in-docker/"
  pathName.endsWith('/')
    ? (pathName = pathName.slice(0, -1))
    : (pathName = pathName)
  //console.log('getFolderPathFromURL: pathName after remove trailing slash = ' + pathName)
  //console.log('getFolderPathFromURL: pathName file extension = ' + path.extname(pathName))
  // remove the file extension, as in .jsp
  path.extname(pathName)
    ? (pathName = pathName.slice(0, -path.extname(pathName).length))
    : (pathName = pathName)
  //console.log('getFolderPathFromURL: pathName after remove file extension = ' + pathName)

  // if this was the site root, then the pathName will be empty, so set it to index
  if (pathName === '') {
    pathName = 'index'
  }
  pathName += '.html'

  const reportFilePath = path.join(
    './.lighthouse/reports/',
    reportRootDir,
    pathName
  )
  //console.log('getFolderPathFromURL: reportFilePath = ' + reportFilePath)
  return reportFilePath
}
