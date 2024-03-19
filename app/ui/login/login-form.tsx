'use client';
import styles from './login-form.module.css';

import { lusitana } from '@/app/ui/fonts';
import { GoogleSignInButton } from './GoogleSignInButton';
import { GitHubSignInButton } from './GithubSignInButton';
import { DemoSignInButton } from './DemoSignInButton';
import { EmailSignUp } from './EmailSignup';

export default function LoginForm() {

  return (
    <div className={styles.formSection}>

      <h1 className={`${lusitana.className} ${styles.heading}`}>
        Sign In
      </h1>

      <GoogleSignInButton/>

      <GitHubSignInButton/>

      <span className={`${lusitana.className} ${styles.orText}`}>
        Or
      </span>

      <DemoSignInButton/>

      <span className={`${lusitana.className} ${styles.orText}`}>
        Or
      </span>

      <EmailSignUp/>

    </div>
  );
}