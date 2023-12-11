import fs from 'fs'
import path from 'path'

export const getJSONFromFile = filePath => {
  const content = fs.readFileSync(filePath, 'utf-8')
  const json = JSON.parse(content)
  return json
}

export const makeDirsForDirPathSafe = dirPath => {
  console.log(`makeDirsForDirPath: dirPath: ${dirPath}`)
  fs.mkdirSync(dirPath, { recursive: true }, error => {
    if (error) console.error('error creating dirs', error)
  })
  if (!fs.existsSync(dirPath)) {
    throw new Error(
      `makeDirsForDirPath: ${dirPath} does not exist, could not create`
    )
  }
}

export const makeDirsForFilePathSafe = filePath => {
  // make sure sub dirs exist
  console.log(
    `makeDirPathForFilePath: filePath: ${filePath} dirname: ${path.dirname(
      filePath
    )}`
  )
  fs.mkdirSync(path.dirname(filePath), { recursive: true }, error => {
    if (error) console.error('error creating directory', error)
  })
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `makeDirPathForFilePath: ${filePath} does not exist, could not create`
    )
  }
}

export const clearDirAndRemake = dirPath => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true })
  }

  fs.mkdirSync(dirPath)
}
