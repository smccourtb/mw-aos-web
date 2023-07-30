import '@/styles/global.css';

import { redirect } from 'next/navigation';
import { userSession } from '@/firebase/serverUserSessionUtils';
import React from 'react';

export default async function FirebaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await userSession();
  if (!userData) {
    redirect('/');
  }

  return (
    <div className="game-background flex h-screen w-screen flex-col ">
      {children}
    </div>
  );
}
