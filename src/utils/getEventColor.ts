import { Colors } from './types';

function getEventColor(type: string) {
  switch (type) {
  case 'Bootstrap':
    return Colors.Purple;
  case 'Follow-up':
    return Colors.Orange;
  case 'Kick-off':
    return Colors.Blue;
  default:
    return Colors.Gray;
  }
}

export default getEventColor;
