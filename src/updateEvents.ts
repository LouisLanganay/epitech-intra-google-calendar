import { getEventColor, getEventEmoji } from './utils';
import config from '../config.json';
import { createEvent, updateEvent } from './utils/api';
import {
  Attendee,
  CalendarEvent,
  Event,
  Member
} from './utils/types';

function getEventSummary(event: Event) {
  const emoji = getEventEmoji(event.type_code);
  const name = ' [' + event.codemodule + '] ' + event.acti_title;

  return emoji + name;
}

async function updateEventSlots(event: Event, eventList: CalendarEvent[]) {
  let count = 0;

  for (const slot of event.slots) {
    for (const subSlot of slot.slots) {
      const subEventId = slot.codeevent.replace('-', '');
      const attendees: Attendee[] = subSlot.members.map((student: Member) => ({
        email: student.login,
        displayName: student.login.split('@')[0]
          .split('.')
          .map(word => word.charAt(0)
            .toUpperCase() + word.slice(1))
          .join(' '),
        responseStatus: 'accepted'
      }));
      const subData: CalendarEvent = {
        id: subEventId,
        summary: getEventSummary(event),
        start: {
          dateTime: new Date(subSlot.date).toISOString(),
          timeZone: config.timeZone
        },
        end: {
          dateTime: new Date(
            new Date(subSlot.date).getTime() + subSlot.duration * 60 * 1000
          ).toISOString(),
          timeZone: config.timeZone
        },
        colorId: getEventColor(event.type_title),
        location: slot.room ?? null,
        description: `\
Note: ${subSlot.note}
Room: ${subSlot.code}`,
        attendees: attendees
      };
      if (eventList.find((e) => e.id === subEventId)) {
        await updateEvent(subData);
        continue;
      }
      count += await createEvent(subData);
    }
  }
  return count;
}

async function updateEvents(events: Event[], eventList: CalendarEvent[]) {
  let count = 0;

  for (const event of events) {
    const eventId = (event.codeevent || event.codeacti).replace('-', '');
    const isRegistered = event.event_registered;
    const data: CalendarEvent = {
      id: eventId,
      summary: getEventSummary(event),
      start: {
        dateTime: new Date(event.start).toISOString(),
        timeZone: config.timeZone
      },
      end: {
        dateTime: new Date(event.end).toISOString(),
        timeZone: config.timeZone
      },
      colorId: isRegistered ? getEventColor(event.type_title) :
        getEventColor('NonRegistered'),
      location: event.room?.code ?? null,
      description: event.titlemodule ?? null,
      transparency: isRegistered ? 'opaque' : 'transparent'
    };

    if (event.slots.length > 0) {
      count += await updateEventSlots(event, eventList);
      continue;
    }

    if (eventList.find((e) => e.id === eventId))
      await updateEvent(data);
    else
      count += await createEvent(data);

  }
  return count;
};

export default updateEvents;
