import * as React from "react"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrMsgRenderer from "../forms/ErrMsgRenderer"
import { FormDiv, TitleRow, InputRow, InputGroup, ButtonGroup, HiddenP, txtCSS } from "../forms/FormComponents"

// The senderEmail is hidden in the form, but is required by the netlify mail integration
// Formik does not support hidden fields so it has to be added here and in initial values
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

  values["form-name"] = "subscribe"

  var botField = document.getElementsByName("bot-field")[0]
  values["bot-field"] = botField.value

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
            <input type="hidden" name="form-name" value="subscribe" />
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

export default SubscribeWidget