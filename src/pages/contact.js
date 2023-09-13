import * as React from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout/Layout"
import Seo from "../components/SEO"
import styled from "@emotion/styled"

// Using netlify email integration, using SendGrid
// Using netlify cli (in dev container) to test email endpoint https://docs.netlify.com/cli/get-started/
// and its spam filters https://docs.netlify.com/forms/spam-filters/

// this seemed useful https://github.com/swyxio/gatsby-netlify-form-example-v2


const Contact = ({ location }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const data = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
      senderEmail: e.target.senderEmail.value,
    }
    
    console.log(data)

    fetch('/.netlify/functions/contact', {
      method: 'POST',
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        senderEmail: data.senderEmail,
      }),
    })
    .then((res) => res.text())
    .then((text) => console.log(text))
    .catch((error) => alert(error))
  }

 /*
  const handleSubmitOLD = (e) => {
    e.preventDefault()
    const form = e.target

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }
*/
  return (
    <Layout location={location}>
      <Seo title="Contact EdPike365" />
      <br />
      <h2>Contact</h2>
      Questions or complaints?  Please fill out the form below.
      <br />
      After you send it, I'll send you a confirmation email and get back to you as soon as I can.
      <FormDiv>
        <form
          name="contact"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
          action="/contact-success/"
            onSubmit={handleSubmit}          
        >
          <FormSubSection>
            <FormColumn>
              <input type="hidden" name="bot-field" />
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
                <input type="text" name="first_name" />
              </InputGroup>
              <InputGroup>
                <label htmlFor="last_name">Last Name:</label>
                <input type="text" name="last_name" />
              </InputGroup>
              <InputGroup>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" />
              </InputGroup>
              <InputGroup>
                <label htmlFor="subject">Subject:</label>
                <input type="text" name="subject" />
              </InputGroup>
              <InputGroup>
                <label htmlFor="message">Message:</label>
                <textarea name="message" rows="5" />
              </InputGroup>
            </FormColumn>
          </FormSubSection>
          <FormSubSection>

            <br/>
            <button type="submit">Send</button>
            <input type="reset" value="Clear" />
          </FormSubSection>
        </form>
      </FormDiv>
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
  min-width: 33%;
  max-width: 99%;

  border: 1px solid var(--color-primary-main);
`

const InputGroup = styled.div`
  display: flex;
  padding: .5rem;
  max-width: 100%;

  & > label {
    display: inline-block;
    margin-right: 1rem;
    padding: 0 0;
    font-weight: bold;

    min-width: 7rem;
    max-width: 20rem;
  }

  & > input {

    padding: .5rem 0;
    border-radius: 5px;
    border: 1px solid var(--color-text-secondary);
    min-width: 16rem;
    max-width: 30rem;
    max-height: 2rem;
  }

  & > textarea {
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid var(--color-text-secondary);
    min-width: 16rem;
    max-width: 30rem;
  }
`

// create hidden field p tag for bot-field
const HiddenP = styled.p`
  display: none;
`


export default Contact