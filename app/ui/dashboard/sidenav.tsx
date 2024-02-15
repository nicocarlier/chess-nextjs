import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import KnightLogo from '../logo/KnightLogo';
import { signOut } from '@/auth';


import styles from './sidenav.module.css'


export default function SideNav() {
 return (
  <div className={styles.container}>
    <Link className={styles.link} href="/">
      <div className={styles.logo}>
        <KnightLogo />
      </div>
    </Link>
      <div className={styles.navContainer}>
        <NavLinks />
        <div className={styles.placeholder}></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button type="submit" className={styles.signOutButton}>
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
