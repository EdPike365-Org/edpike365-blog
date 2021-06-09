import * as React from "react"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"

const About = ({location}) => {
  
 return (
    <Layout location={location}>
      <Seo title="About" />
      <h2>About</h2>
    </Layout>
  )
}

export default About

