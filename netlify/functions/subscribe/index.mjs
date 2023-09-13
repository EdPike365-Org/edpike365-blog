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
      subject: "You are now subscribed to EdPike365.com!",
      parameters: {
        name: requestBody.name,
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
      subject: "EdPike365.com subscriber: " + requestBody.name,
      parameters: {
        name: requestBody.name,
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