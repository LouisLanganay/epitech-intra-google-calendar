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
    if (!event.codeevent && !event.codeacti) {
      console.warn('Missing event properties, skipping event');
      return '';
    }
    return (event.codeevent || event.codeacti).replace('-', '');
  });
  const modulesIds = planning.modules.map((module) => {
    return 'm' + module.id.toString();
  });
  const subEventsIds = planning.events
    .map((event) => event.events.map((subEvent) => subEvent.code.replace('-', '')))
    .flat();
  const modulesProjectsIds = planning.modules
    .map((module) => module.projects
      .map((project) => 'project' + project.id_projet + project.codeacti.slice(5)))
    .flat();

  const eventsToDelete = eventList.filter(({ id, status, end }) => {
    const isEventInPast = moment(end.dateTime).isBefore(moment());

    return (
      !eventsIds.includes(id) &&
      !subEventsIds.includes(id) &&
      !modulesIds.includes(id) &&
      !modulesProjectsIds.includes(id) &&
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
