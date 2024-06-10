import { google } from 'googleapis';
import oAuth2Client from '../oAuth2Client';
import { CalendarEvent } from '../../utils/types';

async function createEvent(event: CalendarEvent) {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    requestBody: {
      id: event.id,
      summary: event.summary,
      start: event.start,
      end: event.end,
      location: event.location,
      description: event.description,
      colorId: event.colorId,
      attendees: event.attendees?.map((attendee) => {
        return {
          email: attendee.email,
          displayName: attendee.displayName,
          responseStatus: 'accepted'
        };
      }),
      status: 'confirmed',
      visibility: event.visibility || 'default',
      transparency: event.transparency || 'transparent'
    }
  });

  if (response.status === 200) {
    console.info('Event "' + event.summary + '" created');
    return 1;
  } else {
    console.error('Error creating event');
    return 0;
  }
};

export default createEvent;
