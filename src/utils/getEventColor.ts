import config from '../../config.json';
import { Colors } from './types';

type ConfigColors = {
  [key: string]: string;
};

function getEventColor(type: string) {
  const colors: ConfigColors = config.colors;
  const color: string = colors[type];

  if (color === 'blue')
    return Colors.Blue;
  if (color === 'green')
    return Colors.Green;
  if (color === 'purple')
    return Colors.Purple;
  if (color === 'red')
    return Colors.Red;
  if (color === 'yellow')
    return Colors.Yellow;
  if (color === 'orange')
    return Colors.Orange;
  if (color === 'turquoise')
    return Colors.Turquoise;
  if (color === 'gray')
    return Colors.Gray;
  if (color === 'bold-blue')
    return Colors.BoldBlue;
  if (color === 'bold-green')
    return Colors.BoldGreen;
  if (color === 'bold-red')
    return Colors.BoldRed;
  return Colors.Gray;
}

export default getEventColor;
