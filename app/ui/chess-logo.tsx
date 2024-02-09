// import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Logo from '@/app/ui/logo.svg';

export default function KnightLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <Logo className="h-12 w-12 mr-2" />
        {/* <p className="text-[44px] hidden custom:block">Chess by Nico</p>
        <p className="text-[44px] block custom:hidden">Chess</p> */}
        <p className="text-[44px]">Chess</p>
    </div>
  );
}


