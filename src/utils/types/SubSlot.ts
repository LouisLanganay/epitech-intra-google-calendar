import Member from './Member';

interface SubSlot {
  acti_title: string;
  date: string;
  duration: number;
  status: string;
  bloc_status: string;
  id_team: string;
  id_user: null | string;
  date_ins: string;
  code: string;
  title: string;
  module_title: string;
  members_pictures: string;
  note: null | string;
  past: number;
  master: Member;
  members: Member[];
  id: number;
}

export default SubSlot;
