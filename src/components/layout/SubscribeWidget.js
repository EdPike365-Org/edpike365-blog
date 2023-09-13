import * as React from "react"
import styled from "@emotion/styled"

const SubscribeWidget = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      senderEmail: e.target.senderEmail.value,
    }
    
    console.log(data)

    fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        senderEmail: data.senderEmail,
      }),
    })
    .then((res) => res.text())
    .then((text) => console.log(text))
    .catch((error) => alert(error))
  }

  return (
    <form
      name="subscribe"
      method="post"
      action="/.netlify/functions/subscribe"
      onSubmit={handleSubmit}
    >
      <FormRow>
        <strong>Subscribe To My Newsletter:</strong>
        <p name="response-output"></p>
      </FormRow>
      <FormRow>
        <input type="hidden" name="senderEmail" value="ed@edpike365.com" />
        <label htmlFor="name">Username:</label>
        &nbsp;&nbsp;
        <input type="text" name="name" />
        &nbsp;&nbsp;&nbsp;
        <label htmlFor="email">Email:</label>
        &nbsp;&nbsp;
        <input type="email" name="email" />
        &nbsp;&nbsp;&nbsp;
        <button type="submit">Subscribe</button>
      </FormRow>      </form>

  )
}

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  padding: .75rem;
  min-width: 33%;
  max-width: 90%;

  border: 1px solid var(--color-primary-main);
`

export default SubscribeWidget