import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/SEO"

const Contact = ({location}) => {
  
 return (
    <Layout location={location}>
      <Seo title="Contact" />
      <h2>Contact</h2>
      <ol>Will hold:
      <li>Email list signup</li>
      </ol>
    </Layout>
  )
}

export default Contact