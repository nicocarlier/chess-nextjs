'use client';

import {
  CalendarDaysIcon,
  UserIcon,
  BackwardIcon
} from '@heroicons/react/24/outline';

import { FaRegChessQueen } from "react-icons/fa6";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Play', href: '/dashboard', icon: FaRegChessQueen },
  { name: 'Game History', href: '/dashboard/game-history', icon: BackwardIcon },
  { name: 'Friends', href: '/dashboard/customers', icon: UserIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              // 'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-gray-800 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                // hover:bg-gray-200 hover:text-gray-800
                // 'bg-sky-100 text-blue-600': pathname === link.href,
                'bg-grey-200 text-grey-800': pathname === link.href,
              },
            )}
            // className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" size="1.5em" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
