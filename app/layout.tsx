import '@/app/ui/global.css';
import { inter } from './ui/fonts';

import type { Metadata } from 'next'
import { Providers } from '@/redux/providers';
// import { store } from '@/redux/store';

// import SessionWrapper from './lib/SessionWrapper';
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"

export const metadata: Metadata = {
  title: "Chess by Nico",
  description: "full stack chess app in Next 14",
}


// export default function RootLayout({
//   Component,
//   pageProps: { session, ...pageProps },
// }: AppProps){
//   return (
//     <SessionProvider session={session}>
//       <Providers>
//         <html lang="en">
//           <body className={`${inter.className} antialiased`}>
//             <Component {...pageProps} />
//           </body>
//         </html>
//       </Providers>
//     </SessionProvider>
//   );
// }


export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    // <SessionProvider session={session}>
      <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
      </Providers>
    // </SessionProvider>

  )
}
