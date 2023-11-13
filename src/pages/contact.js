import * as React from 'react'
import Layout from '../components/layout/Layout'
import ContactForm from '../components/forms/ContactForm'

const Contact = ({ location }) => {
  return (
    <Layout location={location}>
      <br />
      <h2>Contact</h2>
      Questions or complaints? Please fill out the form below.
      <br />
      After you send it, I'll send you a confirmation email and get back to you
      as soon as I can.
      <br />
      This form uses Formik, Yup, and Netlify Functions. The Netlify Function is
      a serverless function that uses SendGrid to send the email.
      <ContactForm />
      <br />
    </Layout>
  )
}

export default Contact
