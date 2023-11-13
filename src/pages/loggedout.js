import React from 'react'
import Layout from '../components/layout/Layout'

const LoggedOut = () => {
  return (
    <Layout>
      <br />
      <div>
        <h2>Logged Out!</h2>
        <p>I configured Auth0 to send you here when you log out.</p>
        <br />
      </div>
    </Layout>
  )
}

export default LoggedOut
