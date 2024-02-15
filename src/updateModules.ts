import { getEventColor } from './utils';
import { createEvent, deleteEvent, updateEvent } from './utils/api';
import {
  CalendarEvent,
  Module,
  Colors,
  Project
} from './utils/types';
import config from '../config.json';

type ColorsMap = {
  [key: string]: Colors;
};

type StatusMap = {
  [key: string]: string;
};

const colorMap: ColorsMap = {
  'valid': getEventColor('ModuleValid'),
  'fail': getEventColor('ModuleFail'),
  'default': getEventColor('ModuleDefault')
};

const statusMap: StatusMap = {
  'valid': 'Validated ✅',
  'fail': 'Failed ❌',
  'ongoing': 'Ongoing ⏳'
};

async function updateModules(modules: Module[], eventList: CalendarEvent[]) {
  let count = 0;

  for (const module of modules) {
    const moduleId = 'm' + module.id.toString();
    const data: CalendarEvent = {
      id: moduleId,
      summary: module.title,
      start: {
        dateTime: new Date(module.begin).toISOString(),
        timeZone: 'Europe/Paris'
      },
      end: {
        dateTime: new Date(module.end).toISOString(),
        timeZone: 'Europe/Paris'
      },
      location: module.location_title,
      description: `\
Semester: ${module.semester}
Credits: ${module.credits}
Status: ${statusMap[module.status]}
Code: ${module.code}`,
      colorId: colorMap[module.status] || colorMap['default']
    };

    if (eventList.find((e) => e.id === moduleId)) {
      if (config.display.modules.display === true)
        await updateEvent(data);
      else
        await deleteEvent(eventList.find((e) => e.id === moduleId));
    } else if (config.display.modules.display === true)
      count += await createEvent(data);
    if (config.display.projects.display === true && module.projects.length > 0)
      await updateModuleProjects(module.projects, eventList);
  }
  return count;
};

async function updateModuleProjects(
  Projects: Project[], eventList: CalendarEvent[]
) {
  for (const project of Projects) {
    const projectId = 'project' + project.id_projet + project.codeacti.slice(5);
    const data: CalendarEvent = {
      id: projectId,
      summary: project.project_title,
      start: {
        dateTime: new Date(project.begin).toISOString(),
        timeZone: 'Europe/Paris'
      },
      end: {
        dateTime: new Date(project.end).toISOString(),
        timeZone: 'Europe/Paris'
      },
      location: project.instance_location,
      colorId: getEventColor('Blue')
    };

    if (eventList.find((e) => e.id === projectId)) {
      if (config.display.projects.display === true)
        await updateEvent(data);
      else
        await deleteEvent(eventList.find((e) => e.id === projectId));
    } else if (config.display.projects.display === true)
      await createEvent(data);
  }
}

export default updateModules;
