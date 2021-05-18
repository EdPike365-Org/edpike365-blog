import * as React from "react"
import Layout from "../components/Layout"
import SeO from "../components/SEO"

const FrontEnd = ({location}) => {
  
 return (
    <Layout location={location}>
      <SeO title="Front End Techologies" />
      <h2>Front End Technologies</h2>
      Front end tech listed by section with anchors
    </Layout>
  )
}

export default FrontEnd