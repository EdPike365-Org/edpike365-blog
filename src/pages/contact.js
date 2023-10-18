import * as React from "react"
import { navigate } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from "formik";
import Layout from "../components/layout/Layout"
import Required from "../components/forms/Required"
import ErrMsgRenderer from "../components/forms/ErrMsgRenderer"
import { InputRow } from "../components/forms/FormComponents"
import ReCAPTCHA from "react-google-recaptcha"
import LoaderSpinner from "../components/LoaderSpinner";

// Using netlify email integration, using SendGrid
// Using netlify cli (in dev container) to test email endpoint https://docs.netlify.com/cli/get-started/
// and its spam filters https://docs.netlify.com/forms/spam-filters/
//
// Recaptcha articles:
//    https://www.delasign.com/blog/react-gatsby-recaptcha-protection/
//    https://www.seancdavis.com/posts/how-to-use-netlify-forms-with-gatsby/
//    https://medium.com/hackernoon/formik-handling-files-and-recaptcha-209cbeae10bc
//    https://www.delasign.com/blog/ts-serverless-recaptcha/
//    https://www.delasign.com/blog/react-gatsby-recaptcha-protection/
//    https://stackoverflow.com/questions/65901771/how-to-make-invisible-react-google-recaptcha-formik-and-yup-work-together
//  includes serverside validation: https://blog.logrocket.com/implement-recaptcha-react-application/

// "g-recaptcha-response" required for netlify forms, populate from validator function
const myInitialValues = {

  recaptchaToken: "",
  "g-recaptcha-response": "",
  "form-name": "contact",
  "bot-field": "",
  senderEmail: "ed@edpike365.com",
  first_name: '',
  last_name: '',
  email: '',
  subject: '',
  message: '',

}

const Contact = ({ location }) => {

  //must use useRef to get the recaptcha value
  //useRef must be in the functional component body
  const reCaptchaRef = React.useRef(null);

  // this custom validator may not be needed anymore since I'm using useField
  // but I'm leaving it here because it is AT LEAST a good demo 
  Yup.addMethod(Yup.string, "recaptchaValidate", function (errorMessage) {

    return this.test(
      "recaptcha-validate",
      errorMessage,
      async (value) => {
        //console.log("recaptchaValidate: value = ", value)
        
        // the value passed in above was always null, so we had to get it from the ref
        // but then it seems that is started working when I added useField
        try {
          //const token = reCaptchaRef.current.getValue()
          return !!value;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
    );

  });

  const MyRecaptcha = ({ label, ...props }) => {
    const [fieldProps] = useField(props.name);
    const { setFieldValue } = useFormikContext();
    return (
      <>
        <InputRow>
          <ErrorMessage name="recaptchaToken" render={ErrMsgRenderer} />
        </InputRow>
        <InputRow>
          <ReCAPTCHA
            ref={reCaptchaRef}
            sitekey={process.env.GATSBY_APP_SITE_RECAPTCHA_KEY}
            {...fieldProps}
            {...props}

            onChange={(val) => {
              //val is actually the token from the recaptcha, but it is not being 
              //used for setFieldValue automatically by Formik for some reason, so we do it manually.

              // if the verification expires, this will make error message appear
              //validateField('recaptchaToken')

              // this will cause isDirty to become true!!! yay!!!
              // the last arg is to run validate form, and we need to
              // because otherwise isValid will be true even though the rest of the form is not valid
              setFieldValue('recaptchaToken', val, true)

              }
            }
          />
        </InputRow>

      </>
    );
  }

  const myValidationSchema = Yup.object({
    recaptchaToken: Yup.string()
      .recaptchaValidate('Please complete the reCAPTCHA'),
    "g-recaptcha-response": Yup.string(),
    "form-name": Yup.string(),
    senderEmail: Yup.string()
      .required('senderEmail is empty'),
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

  const myHandleSubmit = (values, actions) => {

    //Formik does not support hidden fields so it has to be added here
    const botField = document.getElementsByName("bot-field")[0]
    //values["bot-field"] = botField.value
    actions.setFieldValue("bot-field", botField.value)

    // https://www.seancdavis.com/posts/how-to-use-netlify-forms-with-gatsby/
    // Netlify's reCAPTCHA *automatic* support doesn't extend to forms rendered by JavaScript
    // (as Gatsby's pages are/). 
    // g-recaptcha-response is needed for netlify forms to 
    // filter out spam before it gets to the netlify serverless function, saving on function invocations
    //values["g-recaptcha-response"] = values["recaptchaToken"]
    actions.setFieldValue("g-recaptcha-response", values["recaptchaToken"])

    fetch('/.netlify/functions/contact', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then((response) => {
        // an async error might fire even if you get back a 200 (related to recaptcha)?
        // then you get an "undefined" because we are not on this page anymore??
        if (response.status === 200) {
          navigate("/contact-success/")
        } else {
          alert("There was a problem sending your message.  Please try again later.")
        }
      })
      .then((data) => {
        //console.log("data = " + JSON.stringify(data))
      })
      .catch((error) => alert(error))
      .finally(() => {

      })

  }

  const myHandleReset = (values, actions) => {
    reCaptchaRef.current.reset()
  }

  return (
    <Layout location={location}>
      <br />
      <h2>Contact</h2>
      Questions or complaints?  Please fill out the form below.
      <br />
      After you send it, I'll send you a confirmation email and get back to you as soon as I can.
      <br />
      This form uses Formik, Yup, and Netlify Functions. The Netlify Function is a serverless function that uses SendGrid to send the email.
      <Formik
        initialValues={myInitialValues}
        validationSchema={myValidationSchema}
        onSubmit={myHandleSubmit}
        onReset={myHandleReset}
      >
        {({ isSubmitting, isValid, dirty, validateField, setFieldTouched }) => (
          //for list of props, see https://formik.org/docs/api/formik
          <FormDiv>
          { isSubmitting? (  <LoaderSpinner message={"Contacting..."} /> ) : null }
            <Form
              name="contact"
              method="post"
              netlify-honeypot="bot-field"
              data-netlify-recaptcha="true"
              data-netlify="true"
              action="/contact-success/"
            >
              <FormSubSection>
                <FormColumn>
                  <input type="hidden" name="form-name" value="contact" />
                  <HiddenP>
                    <label htmlFor="bot-field">
                      Do fill this out if you are human:
                    </label>
                    <Field name="bot-field" id="bot-field" type="text" />
                  </HiddenP>
                  <noscript>
                    <p>This form will not work with Javascript disabled</p>
                  </noscript>
                  <InputGroup>
                    <label htmlFor="first_name">First Name:</label>
                    <ErrorMessage name="first_name" render={ErrMsgRenderer} />
                    <Field name="first_name" id="first_name" type="text" css={txtCSS} />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="last_name">Last Name:</label>
                    <ErrorMessage name="last_name" render={ErrMsgRenderer} />
                    <Field name="last_name" id="last_name" type="text" css={txtCSS} />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="email">Email:<Required /></label>
                    <ErrorMessage name="email" render={ErrMsgRenderer} />
                    <Field name="email" id="email" type="email" css={txtCSS} />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="subject">Subject:<Required /></label>
                    <ErrorMessage name="subject" render={ErrMsgRenderer} />
                    <Field name="subject" id="subject" type="text" css={txtLongCSS} />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="message">Message:<Required /></label>
                    <ErrorMessage name="message" render={ErrMsgRenderer} />
                    <Field name="message" id="message" as="textarea" rows="5" />
                  </InputGroup>
                  <MyRecaptcha name="recaptchaToken" id="recaptchaToken" />
                </FormColumn>
              </FormSubSection>
              <FormSubSection>
                <button type="submit" disabled={isSubmitting || !dirty || !isValid } >Send</button>
                <button type="reset" disabled={isSubmitting || !dirty } >Reset</button>
              </FormSubSection>
              <FormSubSection>
                <Required /> = required field
              </FormSubSection>
            </Form>
          </FormDiv>
        )}
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

  & > button[type=reset] {
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

export default Contact