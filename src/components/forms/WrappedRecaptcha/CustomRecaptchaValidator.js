// this custom validator may not be needed anymore since I'm using useField
// but I'm leaving it here because it is AT LEAST a good demo
/*
  Yup.addMethod(Yup.string, 'recaptchaValidate', function (errorMessage) {
    return this.test('recaptcha-validate', errorMessage, async value => {
*/
//becomes
/*
  Yup.addMethod(Yup.string, 'recaptchaValidate', CustomRecaptchaValidator
*/

export function CustomRecaptchaValidator(errorMessage) {
  return this.test('recaptcha-validate', errorMessage, async value => {
    //console.log("recaptchaValidate: value = ", value)

    // the value passed in above was always null, so we had to get it from the ref
    // but then it seems that is started working when I added useField
    try {
      //const token = reCaptchaRef.current.getValue()
      return !!value
    } catch (error) {
      console.error(error)
      return false
    }
  })
}
