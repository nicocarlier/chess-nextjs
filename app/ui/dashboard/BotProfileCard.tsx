import { BOT_IMAGES } from '@/app/lib/botUtils';
import { BotNames } from '@/app/lib/definitions';
import Image from 'next/image';


export function BotProfileCard({
  // title,
  // value,
  // type,
}: {
  // title: string;
  // value: number | string;
  // type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {

  // const profile_img = "/bots/randomizer.webp"
  const name = "Randomizer"
  const description = "\"I bet you can't predict what I'll do next!\" \n\
  The Randomizer uses an algorithm that creates completely random moves. \
  They have the element of surprise, but can you take them down? "


  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h2 className="ml-2 text-sm font-medium">{name}</h2>
      </div>
      <div className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'>
          <Image
            // src={profile_img}
            src={BOT_IMAGES[name.toLowerCase() as BotNames]!}
            className="rounded-full"
            alt={`${name}'s profile picture`}
            width={56}
            height={56}
          />
      </div>
      <div className="flex p-4">
        <p className="ml-2 text-sm font-medium">{description}</p>
      </div>
    </div>
  );
}
