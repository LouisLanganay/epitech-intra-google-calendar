import { google } from 'googleapis';
import oAuth2Client from '../oAuth2Client';
import { CalendarEvent } from '../../utils/types';

async function deleteEvent(event: CalendarEvent) {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  if (event.status !== 'confirmed')
    return 0;

  const response = await calendar.events.delete({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    eventId: event.id
  });

  if (response.status === 204) {
    console.info('Event "' + event.summary + '" deleted');
    return 1;
  } else {
    console.error('Error deleting event');
    return 0;
  }
};

export default deleteEvent;
