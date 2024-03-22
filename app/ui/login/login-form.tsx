'use client';
import styles from './login-form.module.css';

import { lusitana } from '@/app/ui/fonts';
import { GoogleSignInButton } from './google/GoogleSignInButton';
import { GitHubSignInButton } from './github/GithubSignInButton';
import { DemoSignInButton } from './demo/DemoSignInButton';
import { EmailSignInButton } from './email/EmailSignInButton';

export default function LoginForm() {

  return (
    <div className={styles.formSection}>

      <h1 className={`${lusitana.className} ${styles.heading}`}>
        Sign In
      </h1>

      {/* <GoogleSignInButton/> */}

      {/* <GitHubSignInButton/> */}

      <EmailSignInButton/>

      <div className={styles.orContainer}>
        <div className={styles.spacer}></div>
        <span className={`${lusitana.className} ${styles.orText}`}>
          Or
        </span>
        <div className={styles.spacer}></div>
      </div>

      <DemoSignInButton/>

      {/* <span className={`${lusitana.className} ${styles.orText}`}>
        Or
      </span> */}

      {/* <EmailSignUp/> */}

    </div>
  );
}