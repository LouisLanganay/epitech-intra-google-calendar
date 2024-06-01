import Room from './Room';
import Slot from './Slot';
import SubEvent from './SubEvent';

interface Event {
  scolaryear: string;
  codemodule: string;
  codeinstance: string;
  codeacti: string;
  codeevent: string;
  semester: number;
  instance_location: string;
  titlemodule: string;
  prof_inst: any[][];
  acti_title: string;
  num_event: number;
  start: string;
  end: string;
  total_students_registered: number;
  title: string | null;
  type_title: string | 'Workshop' | 'Follow-up' | 'Kick-off' | 'Hackathon' |
  'Conference' | 'Event' | 'Cooperation' | 'TEPitech' | 'Review' | 'Debriefing' |
  'Camp' | 'Stumper' | 'Defense' | 'Pitch' | 'Talk' | 'Delivery';
  type_code: string | 'rdv' | 'class' | 'tp' | 'other' | 'exam';
  is_rdv: string;
  nb_hours: string;
  allowed_planning_start: string;
  allowed_planning_end: string;
  nb_group: number;
  nb_max_students_projet: number | null;
  room: Room | null;
  dates: any;
  module_available: boolean;
  module_registered: boolean;
  past: boolean;
  allow_register: boolean;
  event_registered: string | boolean;
  display: string;
  project: boolean;
  rdv_group_registered: any;
  rdv_indiv_registered: any;
  allow_token: boolean;
  register_student: boolean;
  register_prof: boolean;
  register_month: boolean;
  in_more_than_one_month: boolean;
  slots: Slot[];
  events: SubEvent[];
}

export default Event;
