// pass in process.argv
export const getConfig = argv => {
  // the default config settings are here
  // if specified, we load in config file from the app/configs folder
  // you should not change the default config values here or in the config files that come with the app
  // you should copy them and give them a new name if you want to change them
  let configFileDir = './app/configs/'
  let configFileName = 'default-single.json'

  let argIndex = argv.indexOf('configfiledir')
  if (argIndex > -1) {
    configFileDir = argv[argIndex + 1]
  }

  argIndex = argv.indexOf('configfilename')
  if (argIndex > -1) {
    configFileName = argv[argIndex + 1]
  }

  const configFilePath = path.join(configFileDir, configFileName)
  console.log('configFilePath = ' + configFilePath)

  const configFile = getJSONFromFile(configFilePath)
  return configFile
}

// return an array of targetURLs from a comma separated list
const getTargetURLsFromCSV = csv => {
  console.log('\t CLI overriding targetURLs with target=' + csv)
  const urls = csv.split(',')
  return urls
}

export const getCLIConfigOverrides = (originalConfig, argv) => {
  // return a copy of the config object with CLI overrides
  const config = structuredClone(originalConfig)

  argv.forEach(function (val, index, array) {
    if (val.indexOf('sitemapurl') > -1) {
      config.siteMapURL = val.substring(val.indexOf('=') + 1)
      console.log('\t CLI override siteMapURL = ' + config.siteMapURL)
    } else if (val.indexOf('urls') > -1) {
      config.tarteURLs = getTargetURLsFromCSV(
        val.substring(val.indexOf('=') + 1)
      )
    } else if (val.indexOf('targetdomain') > -1) {
    } else if (val.indexOf('domainoverride') > -1) {
    } else if (val.indexOf('resultssubdir') > -1) {
      config.resultsDirPath = val.substring(val.indexOf('=') + 1)
      console.log('\t CLI override resultsDirPath = ' + resultsDirPath)
    }
  })

  return config
}
