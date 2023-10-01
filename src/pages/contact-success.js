import * as React from "react"
import Layout from "../components/layout/Layout"

// Gatsby auto passes in location object,
// but only for pages in "pages" and "templates", not "components"
const ContactSuccess = ({ data, pageContext, location }) => {


  return (
    <Layout location={location}>
    <br/>
    <h2>Thanks for contacting EdPike365!</h2>
    You should receive a response email to the email you used in the form.
    <br/>
    <br/>
    I'll respond as soon as I can.
    <br/>
    <br/>
    </Layout>
  )
}

export default ContactSuccess