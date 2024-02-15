import { StaticImageData } from 'next/image';

// Bot images
import randomizer from '@/public/bots/randomizer.webp'
import { BotNames } from './definitions';

export const BOT_IMAGES: { [key in BotNames]?: StaticImageData } = {
    'randomizer': randomizer,
};