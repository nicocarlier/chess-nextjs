import {
  UserGroupIcon,
  TrophyIcon,
  StarIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  HandThumbDownIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchChessCardData } from '@/app/lib/data';

const iconMap = {
  played: StarIcon,
  won: ChevronDoubleUpIcon,
  lost: ChevronDoubleDownIcon,
  friends: UserGroupIcon,
  
};

export default async function CardWrapper() {

  const {
    numberOfGames,
    numberOfGamesWon,
    numberOfGamesLost,
    numberOfFriends
  } = await fetchChessCardData()
 
  return (
    <>
      <Card title="Games Played" value={numberOfGames} type="played" />
      <Card title="Games Won" value={numberOfGamesWon} type="won" />
      <Card title="Games Lost" value={numberOfGamesLost} type="lost" />
      <Card title="Friends made" value={numberOfFriends} type="friends" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'played' | 'won' | 'lost' | 'friends';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
