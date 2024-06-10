import { google } from 'googleapis';
import oAuth2Client from '../oAuth2Client';
import { CalendarEvent } from '../../utils/types';

async function updateEvent(event: CalendarEvent) {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const response = await calendar.events.update({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    eventId: event.id,
    requestBody: {
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
    console.info('Event "' + event.summary + '" updated');
  } else {
    console.error('Error updating event');
  }
};

export default updateEvent;
