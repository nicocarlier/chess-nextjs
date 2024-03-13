'use client'

import Link from 'next/link';
import NavLinks from '@/app/ui/playDashboard/sideNav/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import KnightLogo from '../../logo/KnightLogo';
import { signOut } from '@/auth';


import styles from './sidenav.module.css';
import { signOutServerSide } from '@/app/lib/actions';
import SignOutButton from './sign-out-button';
import { useSelector } from 'react-redux';
import { isSideNavMinimized, toggleSideNav } from '@/redux/uiSlice';
import { useDispatch } from 'react-redux';
import ToggleSidenav from './toggleSidenav';


export default function SideNav({minimized}:{minimized: boolean}) {

  const dispatch = useDispatch();

 return (
  <div className={styles.container}>

    <ToggleSidenav minimized={minimized}/>

    <Link className={styles.link} href="/">
      <div className={styles.logo}>
        {!minimized && <KnightLogo />}
      </div>
    </Link>
      <div className={styles.navContainer}>
        {
        // !minimized 
        true
        && 
        <NavLinks minimized={minimized}/>
        }
        <div className={styles.placeholder}></div>
        <SignOutButton minimized={minimized}/>
        {/* <form
            action={async () => {
            await signOutServerSide()
            }}
        >
        <button type="submit" className={styles.signOutButton}>
          {
            !minimized && 
            <>
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </> 
          }
        </button>
      </form> */}
      </div>
    </div>
  );
}
