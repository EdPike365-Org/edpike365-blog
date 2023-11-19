import fetch from "node-fetch";

const handler = async function (event) {

  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Subscribe function: event.body was null."),
    };
  }
  
  const requestBody = JSON.parse(event.body);

  //automatically generated snippet from the email preview
  //sends a request to an email handler for a subscribed email
  await fetch(`${process.env.URL}/.netlify/functions/emails/subscribed-user-notice`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
    },
    method: "POST",
    body: JSON.stringify({
      from: requestBody.senderEmail,
      to: requestBody.email,
      subject: "Your EdPike365.com Subscription!",
      parameters: {
        email: requestBody.email,
      },
    }),
  });

  await fetch(
    `${process.env.URL}/.netlify/functions/emails/subscribed-admin-notice`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
    },
    method: "POST",
    body: JSON.stringify({
      from: requestBody.senderEmail,
      to: requestBody.senderEmail,
      subject: "New EdPike365.com Subscriber: " + requestBody.email,
      parameters: {
        email: requestBody.email,
      },
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Subscribe emails sent to subscriber and admin!"),
  };
};

export { handler };