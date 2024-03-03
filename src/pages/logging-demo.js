import React from 'react'
import Layout from '../components/layout/Layout'
import { getLogger } from '../loggers/pino/log-utils'

const logger = getLogger('home')

//logger.log('home page LOGGER log')
logger.error('home page LOGGER error')
logger.warn('home page LOGGER warn')
logger.info('home page LOGGER info')
logger.debug('home page LOGGER debug')

const LoggingDemo = () => {
  return (
    <Layout>
      <div>
        <h2>Logging Demo</h2>
        This hidden page generates log messages.
        <br />
      </div>
    </Layout>
  )
}

export default LoggingDemo
