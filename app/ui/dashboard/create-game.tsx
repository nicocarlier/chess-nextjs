import { clsx } from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { BotProfileCard } from './BotProfileCard';
import { fetchBots } from '@/app/lib/data';
import BotForm from './BotForm';
 
export default async function CreateGame() {

  const bots = await fetchBots();
 
  return (
    <div className="w-full md:col-span-4">
      <p className={clsx(lusitana.className, 'flex items-center justify-start text-xl md:text-2xl text-gray-900 mb-6')}>
        Play vs...
      </p>
      {/* <BotProfileCard selectedBot={bots[0]}/> */}
      <BotForm bots={bots} />
    </div>
  );
}