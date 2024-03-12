import styles from './minimized-sidenav.module.css';
import SignOutButton from './sign-out-button';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function MinimizedSideNav() {
 return (
  <div className={styles.containerPlaceholder}>
    <div className={styles.linkPlaceholder}>
      <div className={styles.logoPlaceholder}>
      </div>
    </div>
      <div className={styles.navContainerPlaceholder}>
        <div className={styles.placeholderPlaceholder}></div>
        <form>
        <button type="submit" className={styles.signOutButtonPlaceholder}>
          {/* <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div> */}
        </button>
      </form>
        {/* <div className={styles.signOutButtonPlaceholder}></div> */}
      </div>
    </div>
  );
}
