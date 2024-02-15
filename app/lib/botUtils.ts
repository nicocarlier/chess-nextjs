import { StaticImageData } from 'next/image';
import { BotNames } from './definitions';

// Bot images
import randomizer from '@/public/bots/randomizer.webp';
import noviceKnight from '@/public/bots/novice-knight.webp';
import intermediateInvader from '@/public/bots/intermediate-invader.webp';
import advancedArcher from '@/public/bots/advanced-archer.webp';
import mastermindMaverick from '@/public/bots/mastermind-maverick.webp';
import grandmasterGuardian from '@/public/bots/grandmaster-guardian.webp';

export const BOT_IMAGES: { [key in BotNames]?: StaticImageData } = {
    'Randomizer': randomizer,
    'Novice Knight': noviceKnight,
    'Intermediate Invader': intermediateInvader,
    'Advanced Archer': advancedArcher,
    'Mastermind Maverick': mastermindMaverick,
    'Grandmaster Guardian': grandmasterGuardian,
};