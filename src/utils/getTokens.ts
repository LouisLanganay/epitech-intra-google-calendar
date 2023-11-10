import oAuth2Client from './oAuth2Client';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

async function getTokens() {
  console.info('Getting tokens...');
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  console.info('Authorize this app by visiting this url:', authUrl);
}

export default getTokens;
