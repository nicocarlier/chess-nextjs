'use client'

import SideNav from '@/app/ui/playDashboard/sideNav/sidenav';
import styles from './layout.module.css';
import { useSelector } from 'react-redux';
import { isSideNavMinimized } from '@/redux/uiSlice';
import ToggleSidenav from '../ui/playDashboard/sideNav/toggleSizeButton/toggleSidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {

  const minimized = useSelector(isSideNavMinimized);

  // console.log("minimized : ", minimized)


  const sidenavContainerClass = minimized ? styles.minimizedSidenav : styles.sidenav;

  const pseudoSidenavContainerClass = minimized ? styles.minimizedPseudoSidenav : styles.pseudoSidenav;

  return (

    // <div className={`${styles.container} ${minimized ? 'minimized' : ''}`}>
      <div className={styles.container}>

      {/* <div className={styles.sidebar}> */}
      {/* <div className={`${styles.sidebar} ${minimized ? 'minimized' : ''}`}> */}
        {/* <SideNav minimized={minimized}/> */}
        {/* <SideNav/> */}
      {/* </div> */}

      <div className={sidenavContainerClass}>
        <SideNav/>
      </div>

      <div className={pseudoSidenavContainerClass}>
        <ToggleSidenav minimized={minimized}/>
      </div>


      <div className={styles.content}>{children}</div>

    </div>
  );
}