import { StaticImageData } from 'next/image';

// User images
// import DelbadeOliveira from '@/public/users/delba-de-oliveira.png'
// import Lee Robinson from '@/public/users/'
// import Hector Simpson from '@/public/users/'
// import Steven Tey from '@/public/users/'
// import Steph Dietz from '@/public/users/'
// import Michael Novotny from '@/public/users/'
// import Evil Rabbit from '@/public/users/'
// import Emil Kowalski from '@/public/users/'
// import Amy Burns from '@/public/users/'
// import Balazs Orban from '@/public/users/'

import DelbaDeOliveira from '@/public/users/delba-de-oliveira.png';
import LeeRobinson from '@/public/users/lee-robinson.png';
import HectorSimpson from '@/public/users/hector-simpson.png';
import StevenTey from '@/public/users/steven-tey.png';
import StephDietz from '@/public/users/steph-dietz.png';
import MichaelNovotny from '@/public/users/michael-novotny.png';
import EvilRabbit from '@/public/users/evil-rabbit.png';
import EmilKowalski from '@/public/users/emil-kowalski.png';
import AmyBurns from '@/public/users/amy-burns.png';
import BalazsOrban from '@/public/users/balazs-orban.png';


import { SeedUserNames } from './definitions';

export const USER_IMAGES: { [key in SeedUserNames]: StaticImageData } = {
    'Delba de Oliveira': DelbaDeOliveira,
    'Lee Robinson': LeeRobinson,
    'Hector Simpson': HectorSimpson,
    'Steven Tey': StevenTey,
    'Steph Dietz': StephDietz,
    'Michael Novotny': MichaelNovotny,
    'Evil Rabbit': EvilRabbit,
    'Emil Kowalski': EmilKowalski,
    'Amy Burns': AmyBurns,
    'Balazs Orban': BalazsOrban,
};