import styles from '@/app/ui/LoginPage.module.css';
import LoginForm from '../ui/login/login-form';
import KnightLogo from '../ui/logo/KnightLogo';
 
export default function LoginPage() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logoInnerContainer}>
            <KnightLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}