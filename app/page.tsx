'use client';

import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import LandingHeader from '@/components/header/LandingHeader';
import AuthContext from '@/context/AuthContext';
import { clientAuth } from '@/firebase/clientFirebaseApps';

export default function Page() {
  const user = useContext(AuthContext);

  // const [isSubscriber, setIsSubscriber] = useState<boolean>();
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState(false);

  clientAuth.onAuthStateChanged(async (authData) => {
    authData?.getIdTokenResult(true).then((idTokenResult) => {
      // setIsSubscriber(!!idTokenResult?.claims?.subscriber);
      setIsAdmin(!!idTokenResult?.claims?.admin);
      // setIsLoading(false);
    });
  });

  return (
    <AuthContext.Provider value={user}>
      <div className="flex flex-col">
        <LandingHeader />
        <article className="flex flex-col items-center justify-center gap-6 p-10">
          <div
            className="
            text-3xl
            font-normal
            text-black
            lg:text-4xl"
          >
            Start a{' '}
            <TypeAnimation
              className="type block font-extrabold sm:inline"
              sequence={[
                'Seraphon',
                3000,
                'Skaven',
                3000,
                'Khorne',
                3000,
                'Nurgle',
                3000,
                'Gloomspite Gitz',
                4000,
                'Fireslayer',
                3000,
              ]}
              cursor={false}
              omitDeletionAnimation={true}
              wrapper="span"
              repeat={Infinity}
            />
            <p className="text-center">army the easy way.</p>
          </div>
        </article>

        <div className="flex flex-col items-center justify-center gap-6 self-center p-10">
          {isAdmin && <Link href={'/firestore'}>Firestore</Link>}
        </div>

        <div className="mt-10 flex flex-col gap-4 text-center text-sm text-neutral-400">
          <p>Copyright © {new Date().getFullYear()}</p>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
