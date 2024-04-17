const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;


client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.CELL_PHONE_NUMBER,
    body: "Send SMS using Twilio Api in Node.js!"
  }).then((message) => console.log(message.sid));
  