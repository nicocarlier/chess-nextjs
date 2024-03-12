'use client'

import SideNav from '@/app/ui/playDashboard/sideNav/sidenav';
import styles from './layout.module.css';
import { useSelector } from 'react-redux';
import { isSideNavMinimized } from '@/redux/uiSlice';
import MinimizedSideNav from '../ui/playDashboard/sideNav/minimized-sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {

  // const minimized = useSelector(isSideNavMinimized)

  const minimized = true;


  // if (minimized) console.log("Side nav is MINIMIZED!")
  // if (!minimized) console.log("Side nav is MAXIMISED!")

  return (
    // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    //   <div className="w-full flex-none md:w-64">
    //     <SideNav />
    //   </div>
    //   <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    // </div>
    <div className={styles.container}>
      <div className={styles.sidebar}>
        {/* {minimized &&
          <MinimizedSideNav />
        }
        {!minimized &&
          <SideNav />
        } */}
        <SideNav minimized={minimized}/>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}