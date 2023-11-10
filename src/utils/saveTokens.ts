import fs from 'fs';
import { Credentials } from 'google-auth-library';

function saveTokens(tokens: Credentials) {
  fs.writeFile('token.json', JSON.stringify(tokens), (err) => {
    if (err)
      return console.error(err);
    console.info('Token stored to', 'token.json');
  });
};

export default saveTokens;
