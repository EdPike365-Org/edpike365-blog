import * as React from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrMsgRenderer from "../forms/ErrMsgRenderer"

const validationSchema = Yup.object({
  senderEmail: Yup.string()
    .required('senderEmail is empty'),
  email: Yup.string()
    .email('Invalid email address')
    .max(320, 'Must be 320 characters or less')
    .required('Email is required'),
})

const initialValues = {
  senderEmail: "ed@edpike365.com",
  email: '',
}

const handleSubmit = (values) => {

  fetch('/.netlify/functions/subscribe', {
    method: 'POST',
    body: JSON.stringify(values),
  })
    .then((res) => {
      if (res.status === 200){
        document.getElementsByName("subscribe-form-div")[0].innerHTML = "<div style=text-align:center;>You are subscribed to the EdPike365.com newsletter!</div>"
      }else{
        alert("There was a problem sending your message.  Please try again later.")
      } 

    })
    .then((text) => console.log(text))
    .catch((error) => alert(error))

}

const SubscribeWidget = () => {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormDiv name="subscribe-form-div">
        <Form
          name="subscribe"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
          action="/.netlify/functions/subscribe"
        >
          <TitleRow>Subscribe To My Newsletter</TitleRow>
          <InputRow >
            <HiddenP>
              <label>
                Do fill this out if you are human: <input name="bot-field" />
              </label>
            </HiddenP>
            <InputGroup>
              <label htmlFor="email">Email:</label>
              <ErrorMessage name="email" render={ErrMsgRenderer} />
              <Field name="email" type="email" css={txtCSS} />
            </InputGroup>
            <ButtonGroup>
              <button type="submit">Subscribe</button>
            </ButtonGroup>
          </InputRow>
        </Form>
      </FormDiv>
    </Formik>
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
  border: 1px solid var(--color-primary-main);
`

const TitleRow = styled.div`
  display: flex;
  justify-content: center;
  width: 98%;
  padding: .5rem;

  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;  
`

const ResponseRow = styled.div`
  display: none;
  justify-content: center;
  padding: 1rem;
  width: 98%;
  vertical-align: middle;
  text-align: center;
  visibility: hidden;
`

const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%; 
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: .5rem;
  max-width: 100%;
  align-items: center;
  vertical-align: middle;

  & > label {
    vertical-align: middle;
    margin-right: 1rem;
    padding: 0 0;
    font-weight: bold;    
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
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

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
`

// create hidden field p tag for bot-field
const HiddenP = styled.p`
  display: none;
`

const txtCSS = css({
  width: `30rem`,
})

export default SubscribeWidget