import '@/app/ui/global.css';
import { inter } from './ui/fonts';

import type { Metadata } from 'next'
import { Providers } from '@/redux/providers';
// import { store } from '@/redux/store';

export const metadata: Metadata = {
  title: "Chess by Nico",
  description: "full stack chess app in Next 14",
}


export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {children}
        </body>
      </html>
    </Providers>
  );
}


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <Providers>
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//     </Providers>

//   )
// }
