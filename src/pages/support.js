import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/Seo"

export const Head = () => (
  <Seo  title="Support" />
)

const Support = () => {

    return (
    <Layout>
      <div>
        <h2>Support</h2>
        Auth0 sent you here because you had a problem logging in. 
        <br/>
        Use the <Link to="/contact">Contact</Link> page to send us a message.
        <br/>
       </div>
    </Layout>
  )
}

export default Support

