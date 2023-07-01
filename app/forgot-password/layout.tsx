import '@/styles/global.css';

import { redirect } from 'next/navigation';

import Auth from '@/components/Auth';
import { userSession } from '@/firebase/serverUserSessionUtils';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await userSession();
  if (userData) {
    redirect('/');
  }
  return <Auth>{children}</Auth>;
}
