import Project from './Project';

interface Module {
  id: number;
  title_cn: string | null;
  semester: number;
  num: string;
  begin: string;
  end: string;
  end_register: string;
  scolaryear: number;
  code: string;
  codeinstance: string;
  location_title: string;
  instance_location: string;
  flags: string;
  credits: string;
  rights: string[];
  status: string | 'valid' | 'fail' | 'ongoing';
  waiting_grades: number | null;
  active_promo: string;
  open: string;
  title: string;
  projects: Project[];
}

export default Module;
