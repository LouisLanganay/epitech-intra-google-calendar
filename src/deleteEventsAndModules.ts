import { deleteEvent } from './utils/api';
import {
  CalendarEvent,
  Planning
} from './utils/types';
import moment from 'moment';

async function deleteEventsAndModules(
  planning: Planning,
  eventList: CalendarEvent[]
) {
  let count = 0;
  const eventsIds = planning.events.map((event) => {
    return (event.codeevent || event.codeacti).replace('-', '');
  });
  const modulesIds = planning.modules.map((module) => {
    return 'm' + module.id.toString();
  });

  const eventsToDelete = eventList.filter(({ id, status, end }) => {
    const isEventInPast = moment(end.dateTime).isBefore(moment());

    return (
      !eventsIds.includes(id) &&
      !modulesIds.includes(id) &&
      status === 'confirmed' &&
      !isEventInPast
    );
  });

  console.info('Deleting events...');
  for (const event of eventsToDelete) {
    count += await deleteEvent(event);
  }

  console.info(`${count} events deleted`);
};

export default deleteEventsAndModules;
