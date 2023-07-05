import '@/styles/global.css';

import { redirect } from 'next/navigation';
import { userSession } from '@/firebase/serverUserSessionUtils';
import React from 'react';
import AppHeader from '@/components/header/AppHeader';

export default async function FirebaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await userSession();
  if (!userData || !userData?.admin) {
    redirect('/');
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <AppHeader />
      {children}
    </div>
  );
}
