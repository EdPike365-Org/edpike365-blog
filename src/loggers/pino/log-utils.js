import pino from 'pino'
import logLevelData from './log-level'
import sendLogger from './send-logger'

//original tutorial uses TS https://levelup.gitconnected.com/better-logging-in-next-js-apps-with-pino-f973de4dd8dd
const logLevels = new Map(Object.entries(logLevelData))

export function getLogLevel(logger) {
  return logLevels.get(logger) || logLevels.get('*') || 'info'
}

export function getLogger(name) {
  return pino({ name, level: getLogLevel(name) })
}

export function getSendLogger(name) {
  return sendLogger({ name, level: getLogLevel(name) })
}
