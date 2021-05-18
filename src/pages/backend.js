import * as React from "react"
import Layout from "../components/Layout"
import SeO from "../components/SEO"

const BackEnd = ({location}) => {
  
 return (
    <Layout location={location}>
      <SeO title="Back End Techologies" />
      <h2>Back End Technologies</h2>
      Back end tech listed by section with anchors
    </Layout>
  )
}

export default BackEnd