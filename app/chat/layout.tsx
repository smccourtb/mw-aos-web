import '@/styles/global.css';

import { redirect } from 'next/navigation';

import Chat from '@/components/Chat';
import { userSession } from '@/firebase/serverUserSessionUtils';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await userSession();

  if (!userData) {
    redirect('/sign-in');
  }
  return <Chat user={userData}>{children}</Chat>;
}
