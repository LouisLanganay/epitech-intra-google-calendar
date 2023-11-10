import dotenv from 'dotenv';
dotenv.config();
import {
  createEvent,
  getEventList,
  getUserPlanning,
  updateEvent
} from './utils/api';
const app = require('express')();
import { getTokens, oAuth2Client, saveTokens } from './utils';
import fs from 'fs';
import { CalendarEvent, Planning } from './utils/types';
import { exit } from 'process';
import updateEvents from './updateEvents';
import updateModules from './updateModules';

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

  let count = await updateEvents(planning.events, eventList);
  count += await updateModules(planning.modules, eventList);

  console.info(`${count} events created`);
  exit();
}

app.get('/', async (req: any) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.info('tokens', tokens);
    saveTokens(tokens);
    oAuth2Client.setCredentials(tokens);

    await updateCalendar();
  } catch (error) {
    console.error(error);
  }
});

app.listen(process.env.PORT, () => {
  console.info('Example app listening on port 8888!');
  main();
});

