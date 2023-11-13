import * as React from 'react'
import { navigate } from 'gatsby'
import * as styles from './ContactForm.module.css'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import LoaderSpinner from '../../common/LoaderSpinner'
import ErrMsgRenderer from '../ErrMsgRenderer'
import Required from '../Required'
import { WrappedRecaptcha, CustomRecaptchaValidator } from '../WrappedRecaptcha'
//TODO implement recaptcha server side validation
// https://alphonso-javier.medium.com/how-to-use-recaptcha-v3-with-gatsbyjs-and-express-2e963575db60

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
  recaptchaToken: '',
  'g-recaptcha-response': '',
  'form-name': 'contact',
  'bot-field': '',
  senderEmail: 'ed@edpike365.com',
  first_name: '',
  last_name: '',
  email: '',
  subject: '',
  message: '',
}

const ContactForm = ({ location }) => {
  //must use useRef to get the recaptcha value
  //useRef must be in the functional component body
  const reCaptchaRef = React.useRef(null)

  Yup.addMethod(Yup.string, 'recaptchaValidate', CustomRecaptchaValidator)

  const myValidationSchema = Yup.object({
    recaptchaToken: Yup.string().recaptchaValidate(
      'Please complete the reCAPTCHA'
    ),
    'g-recaptcha-response': Yup.string(),
    'form-name': Yup.string(),
    senderEmail: Yup.string().required('senderEmail is empty'),
    first_name: Yup.string().max(50, 'Must be 50 characters or less'),
    last_name: Yup.string().max(50, 'Must be 50 characters or less'),
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

  const handleSubmit = (values, actions) => {
    //Formik does not support hidden fields so it has to be added here
    const botField = document.getElementsByName('bot-field')[0]
    //values["bot-field"] = botField.value
    actions.setFieldValue('bot-field', botField.value)

    // https://www.seancdavis.com/posts/how-to-use-netlify-forms-with-gatsby/
    // Netlify's reCAPTCHA *automatic* support doesn't extend to forms rendered by JavaScript
    // (as Gatsby's pages are/).
    // g-recaptcha-response is needed for netlify forms to
    // filter out spam before it gets to the netlify serverless function, saving on function invocations
    //values["g-recaptcha-response"] = values["recaptchaToken"]
    actions.setFieldValue('g-recaptcha-response', values['recaptchaToken'])

    const targetURL = '/.netlify/functions/contact'

    fetch(targetURL, {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(res => {
        // an async error might fire even if you get back a 200 (related to recaptcha)?
        // then you get an "undefined" because we are not on this page anymore??
        if (res.status === 200) {
          navigate('/contact-success/')
        } else {
          console.error(
            'ContactForm.handleSubmit failed: ' +
              res.status +
              ' ' +
              res.statusText
          )

          var errString = 'Unknown error.'
          if (res.status === 404) {
            errString = '404: The remote service was not found.'
          }

          alert(
            `
            There was a problem sending your contact message. 
              ${errString} 
            Please try again later.
            If the problem persists, send an email or add an issue to github.
            `
          )

          actions.setSubmitting(false)

          //we reset the recaptch widget because it will have an ugly red error message
          // and it will confuse the user even though its not related to the problem
          reCaptchaRef.current.reset()
        }
      })
      .catch(error => alert(error))
      .finally(() => {})
  }

  const handleReset = (values, actions) => {
    reCaptchaRef.current.reset()
  }

  return (
    <Formik
      initialValues={myInitialValues}
      validationSchema={myValidationSchema}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {({ isSubmitting, isValid, dirty, validateField, setFieldTouched }) => (
        //for list of props, see https://formik.org/docs/api/formik
        <div className={styles.formDiv}>
          {isSubmitting ? <LoaderSpinner message={'Contacting...'} /> : null}
          <Form
            name="contact"
            method="post"
            netlify-honeypot="bot-field"
            data-netlify-recaptcha="true"
            data-netlify="true"
            action="/contact-success/"
          >
            <div className={styles.formSubSectionDiv}>
              <div className={styles.formColumnDiv}>
                <input type="hidden" name="form-name" value="contact" />
                <p className={styles.hiddenP}>
                  <label htmlFor="bot-field">
                    Do fill this out if you are human:
                  </label>
                  <Field name="bot-field" id="bot-field" type="text" />
                </p>
                <noscript>
                  <p>This form will not work with Javascript disabled</p>
                </noscript>
                <div className={styles.inputGroupDiv}>
                  <label htmlFor="first_name">First Name:</label>
                  <ErrorMessage name="first_name" render={ErrMsgRenderer} />
                  <Field
                    name="first_name"
                    id="first_name"
                    type="text"
                    className={styles.txtCSS}
                    autoComplete="true"
                  />
                </div>
                <div className={styles.inputGroupDiv}>
                  <label htmlFor="last_name">Last Name:</label>
                  <ErrorMessage name="last_name" render={ErrMsgRenderer} />
                  <Field
                    name="last_name"
                    id="last_name"
                    type="text"
                    className={styles.txtCSS}
                    autoComplete="true"
                  />
                </div>
                <div className={styles.inputGroupDiv}>
                  <label htmlFor="email">
                    Email:
                    <Required />
                  </label>
                  <ErrorMessage name="email" render={ErrMsgRenderer} />
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    className={styles.txtCSS}
                    autoComplete="true"
                  />
                </div>
                <div className={styles.inputGroupDiv}>
                  <label htmlFor="subject">
                    Subject:
                    <Required />
                  </label>
                  <ErrorMessage name="subject" render={ErrMsgRenderer} />
                  <Field
                    name="subject"
                    id="subject"
                    type="text"
                    className={styles.txtLongCSS}
                  />
                </div>
                <div className={styles.inputGroupDiv}>
                  <label htmlFor="message">
                    Message:
                    <Required />
                  </label>
                  <ErrorMessage name="message" render={ErrMsgRenderer} />
                  <Field name="message" id="message" as="textarea" rows="5" />
                </div>
                <WrappedRecaptcha
                  name="recaptchaToken"
                  id="recaptchaToken"
                  ref={reCaptchaRef}
                />
              </div>
            </div>
            <div className={styles.formSubSectionDiv}>
              <button
                type="submit"
                disabled={isSubmitting || !dirty || !isValid}
              >
                Send
              </button>
              <button type="reset" disabled={isSubmitting || !dirty}>
                Reset
              </button>
            </div>
            <div className={styles.formSubSectionDiv}>
              <Required /> = required field
            </div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default ContactForm
