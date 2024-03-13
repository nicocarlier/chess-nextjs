import styles from './layout.module.css';
import SideNav from '../ui/Navs/sideNav/sideNav';
import TopNav from '../ui/Navs/topNav/topNav';
 
export default function Layout({ children }: { children: React.ReactNode }) {

  return (

    <div className={styles.container}>

      <div className={styles.topNavContainer}>
        <TopNav/>
      </div>
      <div className={styles.sideNavContainer}>
        <SideNav/>
      </div>

      <div className={styles.content}>{children}</div>

    </div>
  );
}