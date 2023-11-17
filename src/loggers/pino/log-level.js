//specify logging level for each module
/*
const logLevelData = {
  '*': 'silent',
  home: 'info',
}
*/
const logLevelData = {
  '*': process.env.GATSBY_LOG_LEVEL_DEFAULT || 'error',
}

export default logLevelData
