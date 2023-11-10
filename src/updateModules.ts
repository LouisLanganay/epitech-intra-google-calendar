import { createEvent, updateEvent } from './utils/api';
import {
  CalendarEvent,
  Module,
  Colors
} from './utils/types';

type ColorsMap = {
  [key: string]: Colors;
};

type StatusMap = {
  [key: string]: string;
};

const colorMap: ColorsMap = {
  'valid': Colors.BoldGreen,
  'fail': Colors.BoldRed,
  'default': Colors.Gray
};

const statusMap: StatusMap = {
  'valid': 'Validated ✅',
  'fail': 'Failed ❌',
  'ongoing': 'Ongoing ⏳'
};

async function updateModules(modules: Module[], eventList: CalendarEvent[]) {
  let count = 0;

  for (const module of modules) {
    const moduleId = module.code.replace(/-/g, '').toLowerCase();
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
Semester: ${module.semester}\n
Credits: ${module.credits}\n
Status: ${statusMap[module.status]}`,
      colorId: colorMap[module.status] || colorMap['default']
    };

    if (eventList.find((e) => e.id === moduleId))
      await updateEvent(data);
    else
      count += await createEvent(data);
  }
  return count;
};

export default updateModules;
