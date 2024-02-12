import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css'
import { lusitana } from '@/app/ui/fonts';
import KnightLogo from './ui/logo/KnightLogo';
import InactiveChessBoard from './ui/InactiveChessBoard';
import '@/app/ui/global.css';
import { GAME_START_FEN } from './lib/chessUtils';
import { DemoSignInButton } from './ui/login/DemoSignInButton';
import { authenticate } from './lib/actions';

export default function Page() {
  return (
    <main className={`${styles.homepageContainer}`}>
      <div className={`${styles.logoContainer}`}>
        <KnightLogo/>
      </div>
      <div className={`${styles.homePageBody}`}>
        <div className={`${styles.welcomeBlock}`}>
          <p 
            className={`${lusitana.className} ${styles.welcomeMessage}`}
          >
            <strong>Welcome to Chess by Nico.</strong> Play against your friends or challenge AI bots.
          </p>
          <div className={styles.homePageButtons}>
            <Link
              href="/login"
              className="button-style"
            >
              <span>Log in</span> <ArrowRightIcon className="button-arrow" />
            </Link>
            <DemoSignInButton/>
          </div>
        </div>
        <div className={`${styles.chessboardContainer}`}>
          <div className={styles.desktopChessboard}>
            <InactiveChessBoard position={GAME_START_FEN.split(' ')[0]} />
          </div>
          <div className={styles.mobileChessboard}>
            <InactiveChessBoard position={GAME_START_FEN.split(' ')[0]}/>
          </div>
        </div>
      </div>
    </main>
  );
}