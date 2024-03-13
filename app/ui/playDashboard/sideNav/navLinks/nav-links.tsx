'use client';

import {
  UserIcon,
  BackwardIcon
} from '@heroicons/react/24/outline';

import { FaRegChessQueen } from "react-icons/fa6";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav-links.module.css'

const links = [
  { name: 'Play', href: '/play', icon: FaRegChessQueen },
  { name: 'Game History', href: '/game-history', icon: BackwardIcon },
  { name: 'Account', href: '/account', icon: UserIcon },
];

export default function NavLinks({minimized}:{minimized: boolean}) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
          >
            {
              !minimized &&
              <>
                <LinkIcon className={styles.linkIcon} size="1.5em" />
                <p className={styles.linkText}>{link.name}</p>
              </>
            }
          </Link>
        );
      })}
    </>
  );
}
