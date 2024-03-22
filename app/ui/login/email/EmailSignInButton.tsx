import styles from './EmailSignInButton.module.css';
import {
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function EmailSignInButton() {

  return (
    <Link href="/login/email-auth" className={styles.button}>
      <span className={styles.inputIconContainer}>
        <EnvelopeIcon className={styles.inputIcon} />
      </span>
      <span className={styles.text}>Continue with Email</span>
    </Link>
  );
}