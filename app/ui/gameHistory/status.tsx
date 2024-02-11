import { CheckIcon, ClockIcon, ScaleIcon, TrophyIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function GameStatus({ result }: { result: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-green-500 text-white': result === 'win',
          'bg-yellow-100 text-gray-500': result === 'draw',
          'bg-red-100 text-black-500': result === 'loss',
        },
      )}
    >
      {result === 'win' ? (
        <>
          Won
          <TrophyIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {result === 'draw' ? (
        <>
          Drew
          <ScaleIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {result === 'loss' ? (
        <>
          Lost
          <XMarkIcon className="ml-1 w-4 text-black" />
        </>
      ) : null}
    </span>
  );
}
