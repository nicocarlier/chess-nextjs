'use client'

// import BotForm from './BotForm';
import { clsx } from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { useState } from 'react';
// import { CustomerField } from '@/app/lib/definitions';
// import Link from 'next/link';
// import {
//   CheckIcon,
//   ClockIcon,
//   CurrencyDollarIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
// import { createGame } from '@/app/lib/actions';

import { chessBots, timeControls } from '@/app/lib/definitions'; 
import styles from './GameForm.module.css'; 
import { BotProfileCard } from './BotProfileCard';

type GameParams = {
  bot?: string;
  userColor?: 'black' | 'white';
};
 
export default async function CreateGame() {

  const [gameParams, setGameParams] = useState<GameParams>({});

  const selectBot = (bot: string) => {
    setGameParams(params => ({ ...params, bot }));
  };

  const selectColor = (color: 'black' | 'white') => {
    setGameParams(params => ({ ...params, userColor: color }));
  };
 
  return (
    <div className="w-full md:col-span-4">
      <p className={clsx(lusitana.className, 'flex items-center justify-start text-xl md:text-2xl text-gray-900 mb-6')}>
        Play vs...
      </p>
      <BotProfileCard/>
      <form 
      // action={createGame}
      >
        <div className={styles.field}>
          <label htmlFor="botId" className={styles.label}>
            Choose Bot
          </label>
          <select
            id="botId"
            name="botId"
            defaultValue=""
            className={styles.select}
          >
            <option value="" disabled>Select a bot</option>
            {chessBots.map((bot) => (
              <option key={bot.id} value={bot.id}>
                {bot.name} ({bot.rating})
              </option>
            ))}
          </select>
        </div>

        {/* Time Control Selection */}
        <div className={styles.field}>
          <label htmlFor="timeControl" className={styles.label}>
            Time Control
          </label>
          <select
            id="timeControl"
            name="timeControl"
            defaultValue=""
            className={styles.select}
          >
          <option value="" disabled>Select time control</option>
          {Object.entries(timeControls).map(([category, times]) => (
            <optgroup label={category} key={category}>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time.replace('|', '+')} {category}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Color Selection */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Choose Your Color</legend>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="selectedColor"
              value="white"
              className={styles.radio}
            /> White
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="selectedColor"
              value="black"
              className={styles.radio}
            /> Black
          </label>
        </div>
      </fieldset>

      <div className={styles.actions}>
        <Button type="submit" className={styles.submitButton}>Start Game</Button>
      </div>
    </form>
    </div>
  );
}