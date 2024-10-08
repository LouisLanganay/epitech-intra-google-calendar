import { getEventColor, getEventEmoji } from './utils';
import config from '../config.json';
import { createEvent, updateEvent } from './utils/api';
import {
  Attendee,
  CalendarEvent,
  Event,
  Member,
  SubEvent
} from './utils/types';

function getEventSummary(event: Event) {
  let emoji;

  if (event.type_code === 'other')
    emoji = getEventEmoji(event.type_title);
  else
    emoji = getEventEmoji(event.type_code);
  if (!emoji)
    return getEventEmoji('other');
  const name = ' [' + event.codemodule + '] ' + event.acti_title;

  return emoji + name;
}

async function updateEventSlots(event: Event, eventList: CalendarEvent[]) {
  let count = 0;

  for (const slot of event.slots) {
    for (const subSlot of slot.slots) {
      let subEventId: string;
      if (slot.codeevent)
        subEventId = slot.codeevent.replace('-', '');
      else
        subEventId = slot.id.toString() + subSlot.id.toString();
      const attendees: Attendee[] = subSlot.members.map((student: Member) => ({
        email: student.login,
        displayName: student.login.split('@')[0]
          .split('.')
          .map(word => word.charAt(0)
            .toUpperCase() + word.slice(1))
          .join(' '),
        responseStatus: 'accepted'
      }));
      attendees.push({
        email: subSlot.master.login,
        displayName: subSlot.master.login.split('@')[0]
          .split('.')
          .map(word => word.charAt(0)
            .toUpperCase() + word.slice(1))
          .join(' '),
        responseStatus: 'accepted'
      });
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
        attendees: attendees,
        transparency: 'opaque',
        visibility: 'default'
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

async function updateSubEvents(
  subEvents: SubEvent[],
  event: Event,
  eventList: CalendarEvent[]
) {
  let count = 0;
  const isRegistered = event.event_registered;

  for (const subEvent of subEvents) {
    const subEventId = subEvent.code.replace('-', '');
    const attendees: Attendee[] = subEvent.assistants.map((assistant) => ({
      email: assistant.login,
      displayName: assistant.title,
      responseStatus: 'accepted'
    }));
    const subData: CalendarEvent = {
      id: subEventId,
      summary: getEventSummary(event),
      start: {
        dateTime: new Date(subEvent.begin).toISOString(),
        timeZone: config.timeZone
      },
      end: {
        dateTime: new Date(subEvent.end).toISOString(),
        timeZone: config.timeZone
      },
      colorId: isRegistered ? getEventColor(event.type_title) :
        getEventColor('NonRegistered'),
      location: subEvent.location,
      attendees: attendees,
      transparency: isRegistered ? 'opaque' : 'transparent',
      description: `Number of registered students: ${subEvent.nb_inscrits}
Number of seats: ${subEvent.seats}`,
      visibility: 'default'
    };
    if (eventList.find((e) => e.id === subEventId)) {
      await updateEvent(subData);
      continue;
    }
    count += await createEvent(subData);
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
      transparency: isRegistered ? 'opaque' : 'transparent',
      visibility: 'default'
    };

    if (event.slots?.length > 0 && isRegistered) {
      count += await updateEventSlots(event, eventList);
      continue;
    }

    if (event.events.length > 0 && event.event_registered) {
      count += await updateSubEvents(event.events, event, eventList);
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
