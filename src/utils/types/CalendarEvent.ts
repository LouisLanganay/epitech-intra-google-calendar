import Colors from './Colors';

interface CalendarEvent {
  kind?: string;
  etag?: string;
  id?: string;
  status?: string;
  htmlLink?: string;
  created?: string;
  updated?: string;
  summary?: string;
  creator?: Creator;
  organizer?: Organizer;
  start: Start;
  end: End;
  transparency?: string;
  iCalUID?: string;
  sequence?: number;
  reminders?: Reminders;
  eventType?: string;
  location?: string | null;
  description?: string | null;
  colorId?: Colors;
  attendees?: Attendee[];
}

interface Reminders {
  useDefault: boolean;
}

interface End {
  dateTime: string;
  timeZone: string;
}

interface Start {
  dateTime: string;
  timeZone: string;
}

interface Organizer {
  email: string;
  displayName: string;
  self: boolean;
}

interface Creator {
  email: string;
}

interface Attendee {
  additionalGuests?: number;
  comment?: string;
  displayName?: string;
  email?: string;
  optional?: boolean;
  resource?: boolean;
  responseStatus: 'needsAction' | 'declined' | 'tentative' | 'accepted';
}

export {
  CalendarEvent,
  Attendee
};