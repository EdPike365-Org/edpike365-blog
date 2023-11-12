import * as React from "react"
import Layout from "../components/layout/Layout"

const NotFoundPage = ({ location }) => {

  return (
    <Layout location={location}>
    <div>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist.</p>
      <p>Location: {location.pathname}</p>
    </div>
    </Layout>
  )
}

export default NotFoundPage


