'use client';

import { LoginIcon, LogoutIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

import UserPicSVG from '@/components/icons/UserPicSVG';
import AuthContext from '@/context/AuthContext';
import { clientAuth } from '@/firebase/clientFirebaseApps';
import { signOut } from '@/firebase/clientUserSessionUtils';

const AppHeader = () => {
  const user = useContext(AuthContext);
  const router = useRouter();

  const logout = async () => {
    await signOut(clientAuth);
    await router.refresh();
  };
  return (
    <header className="flex h-16 w-full items-center justify-end py-2 px-6">
      <div className="flex flex-row items-center gap-4">
        <Link href="/" prefetch={false} replace={true}>
          <div
            className="
              cursor-pointer
              rounded-md
              bg-gray-900
              px-2
              py-1.5
              text-sm
              font-semibold
              text-white"
          >
            Go to landing
          </div>
        </Link>
        {user ? (
          <>
            <div
              className="
              flex
              cursor-pointer
              items-center
              gap-1
              text-sm
              font-semibold
              text-black"
              onClick={logout}
            >
              <span>Sign out</span>
              <LogoutIcon className="h-5" />
            </div>
            {user?.picture ? (
              <img
                className="h-9 w-9 rounded-3xl"
                src={user?.picture}
                alt={user?.name}
              />
            ) : (
              <UserPicSVG className="h-9" />
            )}
          </>
        ) : (
          <>
            <Link href="/sign-in" prefetch={false}>
              <div
                className="
              flex
              cursor-pointer
              items-center
              gap-2
              text-sm
              font-semibold
              text-black"
              >
                Sign in
                <LoginIcon className="h-5" />
              </div>
            </Link>
            <Link href="/sign-up" prefetch={false}>
              <div
                className="
              cursor-pointer
              rounded-md
              bg-gray-900
              px-2
              py-1.5
              text-sm
              font-semibold
              text-white"
              >
                Sign up
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
