const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const SENDER_EMAIL = process.env.EMAIL
const CLIENT_ID = process.env.GMAIL_CLIENT_ID
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN

console.log("MAILER CONFIG:");
console.log("  SENDER_EMAIL:", SENDER_EMAIL);
console.log("  CLIENT_ID set:", !!CLIENT_ID);
console.log("  CLIENT_SECRET set:", !!CLIENT_SECRET);
console.log("  REFRESH_TOKEN set:", !!REFRESH_TOKEN);

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID, 
  CLIENT_SECRET
)

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
})

async function sendEmail(to, subject, htmlOrText) {
  try {
    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token || accessTokenResponse;

    if (!accessToken) {
      console.error("Mailer: no access token received");
      throw new Error("Failed to obtain access token from Google");
    }

    console.log("Mailer: got access token, creating transporter...")

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      },
      connectionTimeout: 15000,
      socketTimeout: 15000
    });

    const mailOptions = {
      from: `MediStatus <${SENDER_EMAIL}>`,
      to,
      subject,
      html: htmlOrText
    };

    console.log("Mailer: sending email to", to);
    const result = await transporter.sendMail(mailOptions);
    console.log("Mailer: email sent, messageId:", result.messageId);
    return result;
  } catch (err) {
    console.error("Mailer: error while sending email:", err);
    throw err;
  }
}

module.exports = { sendEmail };