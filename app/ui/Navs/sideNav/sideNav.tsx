'use client'

import Link from 'next/link';
import NavLinks from '@/app/ui/Navs/navLinks/nav-links';
import KnightLogo from '../../logo/KnightLogo';
import SignOutButton from '../signOutButton/sign-out-button';
import { useSelector } from 'react-redux';
import { isSideNavMinimized } from '@/redux/uiSlice';

import styles from './sidenav.module.css';
import SideToggle from '../sideToggle/sideToggle';

export default function SideNav() {

  const minimized = useSelector(isSideNavMinimized);

  const sidenavContainerClass = minimized ? styles.minimizedSidenav : styles.sidenav;
  const pseudoSidenavContainerClass = minimized ? styles.minimizedPseudoSidenav : styles.pseudoSidenav;

 return (

    <>
      <div className={sidenavContainerClass}>
        <div className={styles.container}>
          <Link className={styles.link} href="/">
            <div className={styles.logo}>
              <KnightLogo />
            </div>
          </Link>
            <div className={styles.navContainer}>
              <NavLinks/>
              <div className={styles.placeholder}></div>
              <SignOutButton/>
            </div>
        </div>
      </div>


      <div className={pseudoSidenavContainerClass}>
        <SideToggle minimized={minimized}/>
      </div>
    </>
  );
}
