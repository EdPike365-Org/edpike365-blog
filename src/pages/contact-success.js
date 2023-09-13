import * as React from "react"
import Layout from "../components/layout/Layout"

// Gatsby auto passes in location object,
// but only for pages in "pages" and "templates", not "components"
const ContactSuccess = ({ data, pageContext, location }) => {


  return (
    <Layout location={location}>
    <h2>Thanks for contacting EdPike365!</h2>
    You should receive a response email as well.
    <br/>
    I'll respond as soon as I can.
    </Layout>
  )
}

export default ContactSuccess