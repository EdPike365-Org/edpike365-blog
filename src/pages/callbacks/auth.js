import React from 'react'
import Layout from '../../components/layout/Layout'
import LoaderSpinner from '../../components/common/LoaderSpinner'

const AuthCallback = ({ location }) => {
  //TODO if error, show error here
  return (
    <Layout suppressFooter>
      <LoaderSpinner message={'Logging in...'} />
    </Layout>
  )
}

export default AuthCallback
