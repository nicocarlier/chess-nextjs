import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createGame } from '@/app/lib/actions';

import { chessBots, timeControls } from '@/app/lib/definitions'; 
import styles from './GameForm.module.css'; 

export default function GameForm() {
  return (
    <form action={createGame}>
      {/* Bot Selection */}
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
        {/* <Link href="/dashboard/games" className={styles.cancelLink}>
          Cancel
        </Link> */}
        <Button type="submit" className={styles.submitButton}>Start Game</Button>
      </div>
    </form>
  );
}
