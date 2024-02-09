import GameForm from './game-form';
import { clsx } from 'clsx';
import { lusitana } from '@/app/ui/fonts';
 
export default async function CreateGame() {
 
  return (
    <div className="w-full md:col-span-4">
      <p className={clsx(lusitana.className, 'flex items-center justify-start text-xl md:text-2xl text-gray-900 mb-6')}>
        Play a Bot
      </p>
      <GameForm />
    </div>
  );
}