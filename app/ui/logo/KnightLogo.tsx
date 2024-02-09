import { lusitana } from '@/app/ui/fonts';
import Logo from './logo.svg';
import styles from './KnightLogo.module.css';

export default function KnightLogo() {
  return (
    <div className={`${lusitana.className} ${styles.logoContainer}`}>
      <Logo className={styles.logoIcon} />
      <p className={styles.logoText}>Chess</p>
    </div>
  );
}


