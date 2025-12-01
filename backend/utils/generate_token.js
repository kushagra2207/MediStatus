const fs = require('fs')
const { google } = require('googleapis')
const readlineSync = require('readline-sync')

const CRED_PATH = '../Google_OAuth_Client.json'
const TOKEN_PATH = 'token.json'
const SCOPES = ['https://mail.google.com/']

if (!fs.existsSync(CRED_PATH)) {
  console.error('Please put credentials.json in project root (download from Google Cloud).')
  process.exit(1)
}

const credentials = JSON.parse(fs.readFileSync(CRED_PATH))
const { client_secret, client_id, redirect_uris } = credentials.installed

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

async function main() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  })

  console.log('Authorize this URL in your browser:\n', authUrl)

  const code = readlineSync.question('\nEnter the code from the page here: ')
  const { tokens } = await oAuth2Client.getToken(code)
  oAuth2Client.setCredentials(tokens)

  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2))
  console.log('\nToken saved to', TOKEN_PATH)
  console.log('Refresh token (keep secret):', tokens.refresh_token || '(no refresh token returned)')
}

main().catch(err => {
  console.error('Error generating token', err);
});