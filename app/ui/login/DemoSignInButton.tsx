'use client'

import { authenticate } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import styles from './login-form.module.css';

export function DemoSignInButton() {

  return (
    <form
      action={async () => {
        const imaginaryFormData = new FormData();
        imaginaryFormData.append('email', 'user@nextmail.com');
        imaginaryFormData.append('password', '123456')
        await authenticate(undefined, imaginaryFormData);
      }}
    >
      <button className={`button-style green-button ${styles.fullWidthButton}`}>
        <span>Demo</span>
        <ArrowRightIcon className="button-arrow" />
      </button>
    </form>
  );
}
