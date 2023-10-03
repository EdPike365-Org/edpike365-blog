import * as React from "react"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrMsgRenderer from "../forms/ErrMsgRenderer"
import { FormDiv, TitleRow, InputRow, InputGroup, ButtonGroup, HiddenP, txtCSS } from "../forms/FormComponents"

// The senderEmail is hidden in the form, but is required by the netlify mail integration
// Formik does not support hidden fields so it has to be added here and in initial values
const myValidationSchema = Yup.object({
  senderEmail: Yup.string()
    .required('senderEmail is empty'),
  email: Yup.string()
    .email('Invalid email address')
    .max(320, 'Must be 320 characters or less')
    .required('Email is required'),
})

const myInitialValues = {
  senderEmail: "ed@edpike365.com",
  email: '',
}

const SubscribeWidget = () => {

  const [subscribed, setSubscribed] = React.useState(false)

  React.useEffect(() => {
    //check localstorage for subscribed
    if (localStorage.getItem("subscribed") === "true"){
      setSubscribed(true)
    }
  }, [subscribed]);

  const myHandleSubmit = (values) => {

    values["form-name"] = "subscribe"
  
    var botField = document.getElementsByName("bot-field")[0]
    values["bot-field"] = botField.value
  
    fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 200){
          //save to localstorage, only render form in future if not in localstorage
          localStorage.setItem("subscribed", "true")
          setSubscribed(true)
          document.getElementsByName("subscribe-form-div")[0].innerHTML = "<div style=text-align:center;>You are subscribed to the EdPike365.com newsletter!</div>"
        }else{
          alert("There was a problem sending your message.  Please try again later.")
        } 
  
      })
      .then((text) => console.log(text))
      .catch((error) => alert(error))
  
  }

  if (subscribed){
    return null;
  }
  
  return (
    <FormDiv name="subscribe-form-div">
    <Formik
      initialValues={myInitialValues}
      validationSchema={myValidationSchema}
      onSubmit={myHandleSubmit}
    >
    {({ isSubmitting, isValid, dirty }) => (

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
              <button type="submit" disabled={ isSubmitting || !dirty || !isValid} >Subscribe</button>
            </ButtonGroup>
          </InputRow>
        </Form>

    )}
    </Formik>
    </FormDiv>
  )
}

export default SubscribeWidget