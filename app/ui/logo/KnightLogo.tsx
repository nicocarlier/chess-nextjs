import { lusitana } from '@/app/ui/fonts';
import styles from './KnightLogo.module.css';
import Knight from './Knight';

export default function KnightLogo() {
  return (
    <div className={`${lusitana.className} ${styles.logoContainer}`}>
      <Knight/>
      <p className={styles.logoText}>Chess</p>
    </div>
  );
}


