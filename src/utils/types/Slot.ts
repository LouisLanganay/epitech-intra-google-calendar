import SubSlot from './SubSlot';

interface Slot {
  id: string;
  title: string;
  bloc_status: string;
  room: string;
  codeevent: string;
  slots: SubSlot[];
}

export default Slot;
