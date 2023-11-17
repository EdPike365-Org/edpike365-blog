import pino from 'pino'

//original tutorial uses TS https://levelup.gitconnected.com/better-logging-in-next-js-apps-with-pino-f973de4dd8dd

/*
From https://dev.to/parseable/logging-for-your-frontend-apps-28pj
Note that the Parseable URL https://demo.parseable.io/api/v1/logstream/pinotest points to the pinotest 
stream on Demo Parseable instance. This is a public instance to demonstrate Parseable UI. 
Please don't post any sensitive / production logs to the URL. Refer to Parseable Docs to start your own Parseable instance.
*/

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
