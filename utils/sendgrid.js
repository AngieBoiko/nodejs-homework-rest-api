const sendGrid = require('@sendgrid/mail')
require('dotenv').config()

const API_KEY = process.env(SENDGRID_API_KEY)

sendGrid.setApiKey(API_KEY)

const sendMail = async (data) => {
    const email = { ...data, from: 'boikoanzhela@gmail.com' }
    await sendGrid.send(email)
    return true
}

module.exports = sendMail