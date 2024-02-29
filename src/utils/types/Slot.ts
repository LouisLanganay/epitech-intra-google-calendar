import SubSlot from './SubSlot';

interface Slot {
  id: string;
  title: string;
  bloc_status: string;
  room: string | null;
  codeevent: string | null;
  slots: SubSlot[];
}

export default Slot;
