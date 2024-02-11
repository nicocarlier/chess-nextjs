import { ForwardIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function ReviewGame({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/game-history/${id}/review`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Review Game</span>{' '}
      <ForwardIcon className="h-5 md:ml-4" />
    </Link>
  );
}
