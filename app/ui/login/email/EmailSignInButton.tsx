import styles from './EmailSignInButton.module.css';
import { signIn } from "next-auth/react";
import {
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { getAbsoluteUrl } from '@/app/lib/utils';
import { useEffect } from 'react';
import Link from 'next/link';

const EMAIL_AUTH_URL = "/login/email-auth"

export function EmailSignInButton() {
  const url = getAbsoluteUrl(EMAIL_AUTH_URL)

  return (
    <Link href={url} className={styles.button}>
      <span className={styles.inputIconContainer}>
        <EnvelopeIcon className={styles.inputIcon} />
      </span>
      <span className={styles.text}>Continue with Email</span>
    </Link>
  );
}