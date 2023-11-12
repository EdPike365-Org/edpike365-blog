import * as React from 'react'
//import styles before any components
import * as styles from '../FormComponents.module.css'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import LoaderSpinner from '../../common/LoaderSpinner'
import ErrMsgRenderer from '../ErrMsgRenderer'

// The senderEmail is hidden in the form, but is required by the netlify mail integration
// Formik does not support hidden fields so it has to be added here and in initial values
const myValidationSchema = Yup.object({
  senderEmail: Yup.string().required('senderEmail is empty'),
  email: Yup.string()
    .email('Invalid email address')
    .max(320, 'Must be 320 characters or less')
    .required('Email is required'),
})

const myInitialValues = {
  senderEmail: 'ed@edpike365.com',
  email: '',
}

const SubscribeWidget = () => {
  const [subscribed, setSubscribed] = React.useState(false)

  React.useEffect(() => {
    //check localstorage for subscribed
    if (localStorage.getItem('subscribed') === 'true') {
      setSubscribed(true)
    }
  }, [subscribed])

  const handleSubmit = (values, actions) => {
    //hyphenated fields
    values['form-name'] = 'subscribe'

    var botField = document.getElementsByName('bot-field')[0]
    values['bot-field'] = botField.value

    const targetURL = '/.netlify/functions/subscribe'

    fetch(targetURL, {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(res => {
        if (res.status === 200) {
          //save to localstorage, only render form in future if not in localstorage
          localStorage.setItem('subscribed', 'true')
          setSubscribed(true)

          document.getElementsByName('subscribe-form-div')[0].innerHTML =
            '<div style=text-align:center;>You are subscribed to the EdPike365.com newsletter!</div>'
        } else {
          console.error(
            'SubscribeWidget.handleSubmit failed: ' +
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
          There was a problem sending your subscription.  
              ${errString}
          Please try again later. 
          If the problem persists, contact me using the contact form.
          `
          )

          actions.setSubmitting(false)
        }
      })
      .catch(error => {
        alert(error)
      })
      .finally(() => {})
  }

  if (subscribed) {
    return null
  }

  return (
    <div name="subscribe-form-div" className={styles.formDiv}>
      <Formik
        initialValues={myInitialValues}
        validationSchema={myValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form
            name="subscribe"
            method="post"
            netlify-honeypot="bot-field"
            data-netlify="true"
            action="/.netlify/functions/subscribe"
          >
            {isSubmitting ? <LoaderSpinner message={'Subscribing...'} /> : null}
            <div className={styles.titleRow}>Subscribe To My Newsletter</div>
            <div className={styles.inputRow}>
              <p className={styles.hiddenP}>
                <label>
                  Do fill this out if you are human: <input name="bot-field" />
                </label>
              </p>
              <input type="hidden" name="form-name" value="subscribe" />
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email:</label>
                <ErrorMessage name="email" render={ErrMsgRenderer} />
                <Field
                  name="email"
                  type="email"
                  disabled={isSubmitting}
                  className={styles.txtCSS}
                />
              </div>
              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SubscribeWidget
