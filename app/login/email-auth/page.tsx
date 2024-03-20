import styles from '@/app/ui/EmailAuthPage.module.css';

import { EmailSignUpForm } from '@/app/ui/login/email/EmailSignUpForm';
import KnightLogo from '@/app/ui/logo/KnightLogo';
 
export default function LoginPage() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logoInnerContainer}>
            <KnightLogo />
          </div>
        </div>
        <EmailSignUpForm/>
      </div>
    </main>
  );
}