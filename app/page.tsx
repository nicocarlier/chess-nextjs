import { lusitana } from '@/app/ui/fonts';
import KnightLogo from './ui/logo/KnightLogo';
import InactiveChessBoard from './ui/inactiveBoard/InactiveChessBoard';
import { GAME_START_FEN } from './lib/chessUtils';
import { DemoSignInButton } from './ui/login/demo/DemoSignInButton';
import '@/app/ui/global.css';

export default function Page() {

  return (
    <main className="flex flex-col h-screen p-6 overflow-hidden bg-[var(--grey400)] md:bg-white">
      <div className="flex bg-transparent text-black h-20 flex-shrink-0 items-end rounded-lg p-4 md:h-32 md:bg-[var(--grey500)] md:text-white">
        <KnightLogo />
      </div>
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden p-4">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-[#F9FAFB] md:p-10 md:w-2/5 mb-4 md:mb-0">
          <p className={`${lusitana.className} text-xl text-[#1F2937] leading-normal antialiased md:text-3xl md:leading-normal`}>
            <strong>Welcome to Chess by Nico.</strong> Play against your friends or challenge AI bots.
          </p>
          <div className="flex gap-2.5">
            <DemoSignInButton/>
          </div>
        </div>
        <div className="flex-grow md:w-3/5 flex items-center justify-center">
          <div className="w-full aspect-square max-w-[min(100%,80vh)] max-h-[min(100%,80vw)]">
            <InactiveChessBoard position={GAME_START_FEN.split(' ')[0]} userColor="white" />
          </div>
        </div>
      </div>
    </main>
  );
}