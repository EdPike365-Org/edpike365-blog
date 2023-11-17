import pino from 'pino'

//original tutorial uses TS https://levelup.gitconnected.com/better-logging-in-next-js-apps-with-pino-f973de4dd8dd

const sendFunction = async function (level, logEvent, a, b) {
  /*
  const url = 'https://demo.parseable.io/api/v1/logstream/pinotest'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Basic cGFyc2VhYmxlOnBhcnNlYWJsZQ==',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([logEvent]),
  })
  console.log(response)
  */
}

const sendLogger = (name, logLevel) => {
  pino({
    name,
    level: logLevel,
    browser: {
      serialize: true,
      asObject: true,
      transmit: {
        sendFunction,
      },
    },
  })
}

export default sendLogger
