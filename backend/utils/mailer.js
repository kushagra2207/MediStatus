const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = process.env.GMAIL_CLIENT_ID
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN
const SENDER_EMAIL = process.env.EMAIL

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'urn:ietf:wg:oauth:2.0:oob')

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
})

async function sendEmail(to, subject, htmlOrText) {
  try {
    const accessTokenObj = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenObj.token || accessTokenObj;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    const mailOptions = {
      from: `MediStatus <${SENDER_EMAIL}>`,
      to,
      subject,
      html: htmlOrText
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = { sendEmail };