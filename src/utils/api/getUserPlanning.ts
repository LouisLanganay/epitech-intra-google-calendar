import dotenv from 'dotenv';
dotenv.config();
import Axios from 'axios';
import moment from 'moment';
import {
  Module,
  Event,
  Planning,
  Project,
  Slot,
  User
} from '../types';
import getUser from './getUser';

async function getEventSlots(event: Event, user: User): Promise<Slot[]> {
  console.info('Fetching event slots...');
  const config = {
    'method': 'get',
    'url': process.env.API_BASE_URL + '/module/' + event.scolaryear + '/' +
    event.codemodule + '/' + event.codeinstance + '/' + event.codeacti +
    '/rdv/?format=json',
    'headers': {
      'Cookie': 'user=' + process.env.USER_COOKIE
    }
  };

  const response = await Axios(config).then((response) => {
    return response.data.slots.map((slot: any) => {
      return {
        ...slot,
        slots: slot.slots.filter((subSlot: any) => {
          return subSlot.master?.login === user.login ||
            subSlot.members?.some((member: any) => {
              return member.login === user.login;
            });
        })
      };
    }).filter((slot: any) => slot.slots.length > 0);
  }).catch((error) => {
    console.error(error);
  });

  return response;
}

async function getUserEvent(user: User): Promise<Event[]> {
  console.info('Fetching user events...');
  const config = {
    'method': 'get',
    'url': process.env.API_BASE_URL +
          '/planning/load?format=json' + '&start=' +
          moment().format('YYYY-MM-DD'),
    'headers': {
      'Cookie': 'user=' + process.env.USER_COOKIE
    }
  };

  const response = await Axios(config).then((response) => {
    return response.data.filter((i: Event) => {
      return i.event_registered !== false;
    });
  }).catch((error) => {
    console.error(error);
  });

  for (const event of response) {
    event.slots = await getEventSlots(event, user);
  }

  return response;
}

async function getUserModules(): Promise<Module[]> {
  console.info('Fetching user modules...');
  const config = {
    'method': 'get',
    'url': process.env.API_BASE_URL + '/course/filter?format=json',
    'headers': {
      'Cookie': 'user=' + process.env.USER_COOKIE
    }
  };

  const response = await Axios(config).then((response) => {
    return response.data.filter((i: Module) => {
      return i.status === 'ongoing' || i.status === 'valid' || i.status === 'fail';
    });
  }).catch((error) => {
    console.error(error);
  });

  for (const module of response) {
    module.projects = await getModuleProjects(module);
  }

  return response;
}

async function getModuleProjects(module: Module): Promise<Project[]> {
  console.info('Fetching module projects...');
  const config = {
    'method': 'get',
    'url': process.env.API_BASE_URL + '/module/' +
          module.scolaryear + '/' + module.code + '/' +
          module.codeinstance + '/?format=json',
    'headers': {
      'Cookie': 'user=' + process.env.USER_COOKIE
    }
  };

  const response = await Axios(config).then((response) => {
    if (!response.data.activites)
      return [];
    return response.data.activites.filter((i: Project) => {
      return i.is_projet === true;
    });
  }).catch((error) => {
    console.error(error);
  });

  return response;
}

async function getUserPlanning() {
  const user: User = await getUser();

  const result: Planning = {
    modules: await getUserModules(),
    events: await getUserEvent(user)
  };

  return result;
}

export default getUserPlanning;