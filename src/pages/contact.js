import * as React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"
import Required from "../components/forms/Required"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

// Using netlify email integration, using SendGrid
// Using netlify cli (in dev container) to test email endpoint https://docs.netlify.com/cli/get-started/
// and its spam filters https://docs.netlify.com/forms/spam-filters/

// this seemed useful https://github.com/swyxio/gatsby-netlify-form-example-v2
const sleepPromise = (ms) => new Promise((r) => setTimeout(r, ms));

const validationSchema = Yup.object({
  first_name: Yup.string()
    .max(50, 'Must be 50 characters or less'),
  last_name: Yup.string()
    .max(50, 'Must be 50 characters or less'),
  email: Yup.string()
    .email('Invalid email address')
    .max(320, 'Must be 320 characters or less')
    .required('Email is required'),
  subject: Yup.string()
    .max(256, 'Must be 256 characters or less')
    .required('Subject is required'),
  message: Yup.string()
    .max(1027, 'Must be 1027 characters or less')
    .required('Message is required'),
})

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  subject: '',
  message: '',
}

const Contact = ({ location }) => {

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 400)

    // navigate("/contact-success/")

    fetch('/.netlify/functions/contact', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then((res) => res.text())
      .then((text) => console.log(text))
      .catch((error) => alert(error))

  }

  return (
    <Layout location={location}>
      <Seo title="Contact EdPike365" />
      <br />
      <h2>Contact</h2>
      Questions or complaints?  Please fill out the form below.
      <br />
      After you send it, I'll send you a confirmation email and get back to you as soon as I can.
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormDiv>
          <Form
            name="contact"
            method="post"
            netlify-honeypot="bot-field"
            data-netlify="true"
            action="/contact-success/"
          >
            <FormSubSection>
              <FormColumn>
                <HiddenP>
                  <label>
                    Do fill this out if you are human: <input name="bot-field" />
                  </label>
                </HiddenP>
                <input type="hidden" name="senderEmail" value="ed@edpike365.com" />
                <InputGroup>
                  <noscript>
                    <p>This form will not work with Javascript disabled</p>
                  </noscript>
                  <label htmlFor="first_name">First Name:</label>
                  <ErrorMessage name="first_name" render={renderError} />
                  <Field name="first_name" type="text" css={txtCSS} />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="last_name">Last Name:</label>
                  <ErrorMessage name="last_name" render={renderError} />
                  <Field name="last_name" type="text" css={txtCSS} />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="email">Email:<Required /></label>
                  <ErrorMessage name="email" render={renderError} />
                  <Field name="email" type="email" css={txtCSS} />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="subject">Subject:<Required /></label>
                  <ErrorMessage name="subject" render={renderError} />
                  <Field name="subject" type="text" css={txtLongCSS} />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="message">Message:</label>
                  <ErrorMessage name="message" render={renderError} />
                  <Field name="message" as="textarea" rows="5" />
                </InputGroup>
              </FormColumn>
            </FormSubSection>
            <FormSubSection>
              <button type="submit">Send</button>
              <input type="reset" value="Clear" />
            </FormSubSection>
            <FormSubSection>
              <Required /> = required field
            </FormSubSection>
          </Form>
        </FormDiv>
      </Formik>
      <br />
    </Layout >
  )
}

const FormDiv = styled.div`
  box-sizing: border-box;
  margin: 0 0;
  padding: 0;

  max-width: 100%;

  display: flex;
  flex-direction: column;

  background-color: var(--color-background-paper);
  border-radius: 5px;
`

const FormSubSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  min-width: 98%;
  max-width: 99%;  
  
  & > button[type=submit] {
    padding: 1rem;
    margin: .5rem;
    border: none;
    
    border-radius: 5px;
    font: inherit;
    font-weight: bold;

    background-color: var(--color-primary-main);

    &:hover {
      transform: translateX(-1px) translateY(-1px);
    }

  }

  & > input[type=reset] {
    padding: 1rem;
    margin: .5rem;
    border: none;
    
    background-color: var(--color-primary-main);
    border-radius: 5px;
    font: inherit; 
    font-weight: bold;   

    &:hover {
      transform: translateX(-1px) translateY(-1px);
    }

  }

`

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: .75rem;
  width: 100%;
  min-width: 33%;
  max-width: 100rem;

  border: 1px solid var(--color-primary-main);
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: .5rem;
  max-width: 100%;
  align-items: center;

  & > label {
    vertical-align: middle;
    margin-right: 1rem;
    padding: 0 0;
    font-weight: bold;
    min-width: 7rem;
    max-width: 20rem;
  }

  & > input {
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid var(--color-text-secondary);
    min-width: 10rem;
    max-width: 100rem;
    max-height: 2rem;
  }

  & > textarea {
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid var(--color-text-secondary);
    width: 100%;
    min-width: 10rem;
    max-width: 100rem;
    resize: none;
    
  }
`

// create hidden field p tag for bot-field
const HiddenP = styled.p`
  display: none;
`

const txtCSS = css({
  width: `30rem`,
})

const txtLongCSS = css({
  width: `100rem`,
})

//TODO fix
const renderError = (message) => <p className="help is-danger">{message}&nbsp;&nbsp;</p>;


export default Contact