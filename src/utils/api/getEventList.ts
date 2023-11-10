import dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';
import { oAuth2Client } from '..';
import { CalendarEvent } from '../types';

async function getEventList(): Promise<CalendarEvent[]> {
  console.info('Getting event list...');
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const response = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    maxResults: 2500,
    singleEvents: true,
    orderBy: 'startTime'
  });

  return response.data.items as CalendarEvent[] || [];
}

export default getEventList;
