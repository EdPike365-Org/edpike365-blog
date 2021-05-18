import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SeO from "../components/seo"

const NotFoundPage = ({ location }) => {

  return (
    <Layout location={location} >
      <SeO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist.</p>
    </Layout>
  )
}

export default NotFoundPage


