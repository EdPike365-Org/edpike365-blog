import * as React from "react"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"

const NotFoundPage = ({ location }) => {

  return (
    <Layout location={location} >
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist.</p>
    </Layout>
  )
}

export default NotFoundPage


