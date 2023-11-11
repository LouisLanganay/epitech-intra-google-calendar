import dotenv from 'dotenv';
dotenv.config();
import {
  getEventList,
  getUserPlanning
} from './utils/api';
const app = require('express')();
import { getTokens, oAuth2Client, saveTokens } from './utils';
import fs from 'fs';
import { CalendarEvent, Planning } from './utils/types';
import { exit } from 'process';
import updateEvents from './updateEvents';
import updateModules from './updateModules';
import deleteEventsAndModules from './deleteEventsAndModules';

const TOKEN_PATH = process.env.TOKEN_PATH || 'token.json';

async function main() {
  try {
    const content = await fs.promises.readFile(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(content.toString()));

    await updateCalendar();
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await getTokens();
    } else {
      console.error('Error reading file:', err);
    }
  }
}

async function updateCalendar() {
  let planning: Planning = await getUserPlanning();
  const eventList: CalendarEvent[] = await getEventList();

  await deleteEventsAndModules(planning, eventList);
  let count = await updateEvents(planning.events, eventList);
  count += await updateModules(planning.modules, eventList);

  console.info(`${count} events created`);
}

app.get('/', async (req: any, res: any) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.info('tokens', tokens);
    saveTokens(tokens);
    oAuth2Client.setCredentials(tokens);

    res.send('You can close this tab now');

    await updateCalendar();
    exit();
  } catch (error) {
    console.error(error);
  }
});

app.listen(process.env.PORT, async () => {
  console.info('Example app listening on port ', process.env.PORT);
  await main();
  const result = await fs.promises.stat(TOKEN_PATH).then(() => {
    return 1;
  }).catch(() => {
    return 0;
  });
  if (result === 1)
    exit();
});

