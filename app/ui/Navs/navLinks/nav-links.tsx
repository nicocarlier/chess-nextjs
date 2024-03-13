'use client';

import {
  UserIcon,
  BackwardIcon
} from '@heroicons/react/24/outline';

import { FaRegChessQueen } from "react-icons/fa6";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav-links.module.css'
import { useEffect, useState } from 'react';
import { setTimeout } from 'timers/promises';

const links = [
  { name: 'Play', href: '/play', icon: FaRegChessQueen },
  { name: 'Game History', href: '/game-history', icon: BackwardIcon },
  { name: 'Account', href: '/account', icon: UserIcon },
];

export default function NavLinks(
  // {minimized}:{minimized: boolean}
  ) {
  const pathname = usePathname();

  // const [removeContent, setRemoveContent] = useState<boolean>(minimized);

  // useEffect(() => {
  //   let timeoutId: number | undefined;

  //   if (minimized) {
  //     // Delay removing content when minimized
  //     timeoutId = window.setTimeout(() => setRemoveContent(true), 300);
  //   } else {
  //     // Immediately show content when not minimized
  //     setRemoveContent(false);
  //   }

  //   return () => {
  //     if (timeoutId !== undefined) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [minimized]);


  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${styles.link} ${isActive ? styles.linkActive : ''}
            `
          }
          // ${minimized ? styles.minimized : ''}`
          >
            {
              // !removeContent &&
              // !minimized &&
              true &&
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
