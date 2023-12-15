import config from '../../config.json';

type ConfigEmojis = {
  [key: string]: string;
};

function getEventEmoji(type: string) {
  const emojis: ConfigEmojis = config.emojis;
  const emoji: string = emojis[type];
  if (!emoji)
    return emojis['other'];

  return emoji;
}

export default getEventEmoji;
