import * as React from 'react'
// import styles before any components
import * as styles from './WrappedRecaptcha.module.css'
import { ErrorMessage, useField, useFormikContext } from 'formik'
import ReCAPTCHA from 'react-google-recaptcha'
import ErrMsgRenderer from '../ErrMsgRenderer'

export const WrappedRecaptcha = React.forwardRef(function MyRecaptcha(
  props,
  ref
) {
  const [fieldProps] = useField(props.name)
  const { setFieldValue } = useFormikContext()

  return (
    <>
      <div className={styles.inputRowDiv}>
        <ErrorMessage name="recaptchaToken" render={ErrMsgRenderer} />
      </div>
      <div className={styles.inputRowDiv}>
        <ReCAPTCHA
          ref={ref}
          sitekey={process.env.GATSBY_APP_SITE_RECAPTCHA_KEY}
          {...fieldProps}
          {...props}
          size="compact"
          onChange={val => {
            //val is actually the token from the recaptcha, but it is not being
            //used for setFieldValue automatically by Formik for some reason, so we do it manually.

            // if the verification expires, this will make error message appear
            //validateField('recaptchaToken')

            // this will cause isDirty to become true!!! yay!!!
            // the last arg is to run validate form, and we need to
            // because otherwise isValid will be true even though the rest of the form is not valid
            setFieldValue('recaptchaToken', val, true)
          }}
        />
      </div>
    </>
  )
})
