import styles from './BotProfileCard.module.css';
import { BOT_IMAGES } from '@/app/lib/botUtils';
import { Bot, BotNames } from '@/app/lib/definitions';
import Image from 'next/image';

interface BotProfileCardProps {
  selectedBot: Bot;
}

export const BotProfileCard: React.FC<BotProfileCardProps> = ({ selectedBot }) => {
  const name = selectedBot.name;
  const description = selectedBot.description;

  return (
    <div className={styles.card}>
      <div className={styles.profileImageContainer}>
        <Image
          src={BOT_IMAGES[name as BotNames]!}
          placeholder="blur"
          priority={true}
          style={{
            // objectFit: "cover",
            objectFit: "contain",
            width: "100%",
            height: "auto",
          }}
          alt={`${name}'s profile picture`}
        />
      </div>
      <div className={styles.header}>
        {name}
      </div>
      <div className={styles.description}>
        <p className={styles.descriptionText}>{description}</p>
      </div>
    </div>
  );
}