import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/SEO"

const BackEnd = ({location}) => {
  
 return (
    <Layout location={location}>
      <Seo title="Back End Techologies" />
      <h2>Back End Technologies</h2>
      Back end tech listed by section with anchors
    </Layout>
  )
}

export default BackEnd