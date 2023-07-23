import '@/styles/global.css';

// import { Inter } from '@next/font/google';

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
      <body className={`w-screen bg-white`}>{children}</body>
    </html>
  );
}
