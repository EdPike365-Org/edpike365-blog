import fetch from 'node-fetch'

const handler = async function (event) {
  // recaptcha was valid in order to get here or Netlify would have put this in spam submissions

  //NOTE: you can preview mail forms using http://localhost:8888/.netlify/functions/emails/subscribed-admin-notice

  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify('Contact function: event.body was null.'),
    }
  }

  const reqBody = JSON.parse(event.body)

  //TODO add data to a db, maybe airtable, supabase, firebase?
  //https://www.netlify.com/blog/2018/09/14/forms-and-functions/
  //https://www.netlify.com/blog/2021/06/28/saving-data-to-supabase-and-getting-it-back-again/

  // send a confirmation email to the contactor
  await fetch(
    `${process.env.URL}/.netlify/functions/emails/contact-user-notice`,
    {
      headers: {
        'netlify-emails-secret': process.env.NETLIFY_EMAILS_SECRET,
      },
      method: 'POST',
      body: JSON.stringify({
        from: reqBody.senderEmail,
        to: reqBody.email,
        subject: 'EdPike365.com Contact Summary',
        parameters: {
          first_name: reqBody.first_name,
          last_name: reqBody.last_name,
          email: reqBody.email,
          subject: reqBody.subject,
          message: reqBody.message,
        },
      }),
    }
  )

  // let the admin know about the contact
  await fetch(
    `${process.env.URL}/.netlify/functions/emails/contact-admin-notice`,
    {
      headers: {
        'netlify-emails-secret': process.env.NETLIFY_EMAILS_SECRET,
      },
      method: 'POST',
      body: JSON.stringify({
        from: reqBody.senderEmail,
        to: reqBody.senderEmail,
        subject:
          'Contact Summary for ' + reqBody.first_name + ' ' + reqBody.last_name,
        parameters: {
          first_name: reqBody.first_name,
          last_name: reqBody.last_name,
          email: reqBody.email,
          subject: reqBody.subject,
          message: reqBody.message,
        },
      }),
    }
  )

  return {
    statusCode: 200,
    body: JSON.stringify('Contact emails sent to contactor and admin!'),
  }
}

export { handler }
