import '@/styles/global.css';

// import { Inter } from '@next/font/google';
import { Averia_Serif_Libre } from 'next/font/google';
const averia = Averia_Serif_Libre({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-averia',
});
import { userSession } from '@/firebase/serverUserSessionUtils';

// const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await userSession();
  return (
    <html lang="en">
      <head />
      <body
        className={`h-screen w-screen overflow-y-hidden bg-white ${averia.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
