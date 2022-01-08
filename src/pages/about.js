import * as React from "react"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"

const About = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo title="About" />
      <h2>About</h2>
      <h3>This Site's Technology</h3>
      <p>
        I wrote this site in Gatsby. I wanted to learn a lot about React and JAM
        Stack. I am documenting my work and what I learned in my{" "}
        <a href="/customizations/">Site Customization Journal</a>.
      </p>
      <h3>My Professional Strategic Goals</h3>
      <p></p>
    </Layout>
  )
}

export default About
