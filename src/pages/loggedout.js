import React from "react"
import Layout from "../components/layout/Layout"

const LoggedOut = () => {

    return (
    <Layout>
      <br/>
      <div>
        <h2>Logged Out!</h2>
        <p>Auth0 sent you here because you logged out. I configured Auth0 to send you here.</p>
        <br/>
      </div>
    </Layout>
  )
}

export default LoggedOut