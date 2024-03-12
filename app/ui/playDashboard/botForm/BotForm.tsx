'use client'

import { Button } from '@/app/ui/button';
import { Bot } from '@/app/lib/definitions'; 
import styles from './BotForm.module.css'; 
import { useState } from 'react';
import { BotProfileCard } from './BotProfileCard';
import { useFormState } from 'react-dom';
import { GameState, createBotGame } from '@/app/lib/actions';

// GameParams type
type GameParams = {
  bot?: Bot;
  userColor?: 'black' | 'white';
};

// Updated BotForm component
export default function BotForm({ bots }: { bots: Bot[] }) {
  const [gameParams, setGameParams] = useState<GameParams>({
    bot: bots[0],
    userColor: 'white',
  });

  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createBotGame, initialState);

  const selectBot = (selectedBotId: string) => {
    const selectedBot = bots.find(bot => bot.id === selectedBotId);
    setGameParams(params => ({ ...params, bot: selectedBot }));
  };

  // const selectColor = (color: 'black' | 'white') => {
  //   setGameParams(params => ({ ...params, userColor: color }));
  // };

  return (
    <>
      {gameParams.bot && <BotProfileCard selectedBot={gameParams.bot} />}
      <form action={dispatch}>
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

        <label htmlFor="color-radio-buttons" className={styles.label}>Select Color</label>
        <div id="color-radio-buttons" className="flex items-center">
            <input 
              id="black"
              name="selectedColor"
              type="radio"
              value="black"
              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
            />
            <label
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
            >
              Black
            </label>

            <input 
              id="white"
              name="selectedColor"
              type="radio"
              value="white"
              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
            />
            <label
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
            >
              White
            </label>
        </div>

        <div className={styles.actions}>
          <Button type="submit" className={styles.submitButton}>Start Game</Button>
        </div>
        
      </form>
    </>
  );
};