import config from '../../config.json';

type ConfigEmojis = {
  [key: string]: string;
};

function getEventEmoji(type: string) {
  const emojis: ConfigEmojis = config.emojis;
  const emoji: string = emojis[type];

  return emoji;
}

export default getEventEmoji;
