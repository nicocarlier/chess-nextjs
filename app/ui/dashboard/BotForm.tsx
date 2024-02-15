'use client'

import { Button } from '@/app/ui/button';
import { Bot } from '@/app/lib/definitions'; 
import styles from './GameForm.module.css'; 
import { useState } from 'react';
import { BotProfileCard } from './BotProfileCard';

// Props interface
interface BotFormProps {
  bots: Bot[];
}

// GameParams type
type GameParams = {
  bot?: Bot;
  userColor?: 'black' | 'white';
};

// Updated BotForm component
const BotForm: React.FC<BotFormProps> = ({ bots }) => {
  const [gameParams, setGameParams] = useState<GameParams>({
    bot: bots[0], // Default to the first bot
    userColor: 'white', // Default color
  });

  const selectBot = (selectedBotId: string) => {
    const selectedBot = bots.find(bot => bot.id === selectedBotId);
    setGameParams(params => ({ ...params, bot: selectedBot }));
  };

  const selectColor = (color: 'black' | 'white') => {
    setGameParams(params => ({ ...params, userColor: color }));
  };

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   console.log('Game parameters:', gameParams);
  // };

  return (
    <>
      {gameParams.bot && <BotProfileCard selectedBot={gameParams.bot} />}
      <form 
      // onSubmit={handleSubmit}
      >
        <div className={styles.field}>
          <label htmlFor="botId" className={styles.label}>Choose Bot</label>
          <select
            id="botId"
            name="botId"
            className={styles.select}
            onChange={(e) => selectBot(e.target.value)}
          >
            <option value="" disabled>Select a bot</option>
            {bots.map((bot) => (
              <option key={bot.id} value={bot.id}>{bot.name}</option>
            ))}
          </select>
        </div>

        {/* Time Control and Color Selection Omitted for Brevity */}

        <div className={styles.actions}>
          <Button type="submit" className={styles.submitButton}>Start Game</Button>
        </div>
      </form>
    </>
  );
};

export default BotForm;