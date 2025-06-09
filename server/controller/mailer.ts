import FormData from "form-data"; // form-data v4.0.1
const Mailgun = require("mailgun.js").default; // mailgun.js v11.1.0

export default async function sendSimpleMessage(name: string, email: string, subject :string, message :string) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAIL_GUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });
  try {
    const data = await mg.messages.create("niconet.tech", {
      from: "NicoNet Site <postmaster@niconet.tech>",
      to: ["Nicolas DeMilio <nicodemilio@outlook.com>"],
      subject: `${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}