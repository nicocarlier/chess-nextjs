import styles from './BotProfileCard.module.css';
import { BOT_IMAGES } from '@/app/lib/botUtils';
import { BotNames } from '@/app/lib/definitions';
import Image from 'next/image';


export function BotProfileCard() {
  const name = "Randomizer";
  const description = "\"I bet you can't predict what I'll do next!\" The Randomizer uses an algorithm that creates completely random moves. They have the element of surprise, but can you take them down?";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{name}</h2>
      </div>
      <div className={styles.profileImageContainer}>
        <Image
          src={BOT_IMAGES[name.toLowerCase() as BotNames]!}
          className="rounded-full"
          alt={`${name}'s profile picture`}
          width={56}
          height={56}
        />
      </div>
      <div className={styles.description}>
        <p className={styles.descriptionText}>{description}</p>
      </div>
    </div>
  );
}