import path from 'path'

export function wait(val) {
  return new Promise(resolve => setTimeout(resolve, val))
}

export const insertTimestampIntoFileName = fileName => {
  const ext = path.extname(fileName)
  const base = path.basename(fileName, ext)
  const timestamp = Date.now().toLocaleString()
  const newFileName = `${base}_${timestamp}${ext}`
  return newFileName
}
