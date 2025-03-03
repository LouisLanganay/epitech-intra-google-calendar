import { google } from 'googleapis';

import * as fs from 'fs';

const credPath = process.env.CRED_PATH || 'credentials.json';

const credentials = JSON.parse(fs.readFileSync(credPath, 'utf8'));

const {
  client_secret,
  client_id,
  auth_uri,
  token_uri,
  redirect_uris
} = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0] + ':' + process.env.PORT
);

export default oAuth2Client;
