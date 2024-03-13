import { PowerIcon } from '@heroicons/react/24/outline';
import styles from './sign-out-button.module.css';
import { signOutServerSide } from '@/app/lib/actions';

export default function SignOutButton() {
    return(
        <form
            action={async () => {
            await signOutServerSide()
            }}
        >
        <button type="submit" className={styles.signOutButton}>
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    )
}