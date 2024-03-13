import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import styles from './sign-out-button.module.css';
import { signOutServerSide } from '@/app/lib/actions';

export default function SignOutButton(
  // {minimized}:{minimized: boolean}
  ) {
    return(
        <form
            action={async () => {
            await signOutServerSide()
            }}
        >
        {/* <button type="submit" className={`${styles.signOutButton} ${minimized ? styles.minimized : ''} `}> */}
        <button type="submit" className={styles.signOutButton}>
          {/* <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div> */}
          {
            // !minimized && 
            true && 
            <>
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
              {/* <PowerIcon className={`w-6 ${minimized ? 'hidden' : ''}`} />
              <div className={`hidden md:block ${minimized ? 'hidden' : ''}`}>Sign Out</div> */}
            </> 
          }
        </button>
      </form>
    )
}