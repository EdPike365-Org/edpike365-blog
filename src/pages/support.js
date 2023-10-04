import React from "react"
import Layout from "../components/layout/Layout"

const Support = () => {

    return (
    <Layout>
      <div>
        <h2>Support</h2>
        Auth0 sent you here because you had a problem logging in.
        <br/>
        domain={process.env.GATSBY_AUTH0_DOMAIN}
        <br/>
        clientId={process.env.GATSBY_AUTH0_CLIENTID}
        <br/>
        callback={process.env.GATSBY_AUTH0_CALLBACK}

      </div>
    </Layout>
  )
}

export default Support

