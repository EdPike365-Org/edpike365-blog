import * as React from "react"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"

const FrontEnd = ({location}) => {
  
 return (
    <Layout location={location}>
      <Seo title="Front End Techologies" />
      <h2>Front End Technologies</h2>
      Front end tech listed by section with anchors
    </Layout>
  )
}

export default FrontEnd