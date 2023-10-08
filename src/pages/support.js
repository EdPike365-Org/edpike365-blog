import React from "react"
import Layout from "../components/layout/Layout"
import { Link } from "gatsby"

const Support = () => {

    return (
    <Layout>
      <div>
        <h2>Support</h2>
        Auth0 sent you here because you had a problem logging in. Use the <Link to="/contact">Contact</Link> page to send us a message.
        <br/>
       </div>
    </Layout>
  )
}

export default Support

