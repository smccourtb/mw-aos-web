'use client';

import { LoginIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import DownloadButton from '@/components/buttons/DownloadButton';
import StripeButton from '@/components/buttons/StripeButton';
import CloudFunctionsDemo from '@/components/demo/CloudFunctionsDemo';
import StripeButtonDemo from '@/components/demo/StripeButtonDemo';
import LandingHeader from '@/components/header/LandingHeader';
import ChatGPTSVG from '@/components/icons/ChatGPTSVG';
import FirebaseSVG from '@/components/icons/FirebaseSVG';
import NextSVG from '@/components/icons/NextSVG';
import Loader from '@/components/loader/Loader';
import AuthContext from '@/context/AuthContext';
import { clientAuth } from '@/firebase/clientFirebaseApps';
import ChatGPT from '@/lib/docs/chat_gpt.md';
import DeployToVercel from '@/lib/docs/deploy_to_production.md';
import Firebase from '@/lib/docs/firebase_setup.md';
import Storage from '@/lib/docs/firebase_storage.md';
import GettingStarted from '@/lib/docs/getting_started.md';

export default function Page() {
  const user = useContext(AuthContext);

  const [isSubscriber, setIsSubscriber] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  clientAuth.onAuthStateChanged(async (authData) => {
    authData?.getIdTokenResult(true).then((idTokenResult) => {
      setIsSubscriber(!!idTokenResult?.claims?.subscriber);
      setIsLoading(false);
    });
  });

  return (
    <AuthContext.Provider value={user}>
      <div className="flex flex-col">
        <LandingHeader />
        <article className="flex flex-col items-center justify-center gap-6 p-10">
          <div
            className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-6
            text-5xl
            font-minion
            font-extrabold
            text-black
            md:text-6xl
            lg:flex-row"
          >
            <NextSVG className="h-10 md:h-16">Next.js 13</NextSVG>
            <FirebaseSVG className="h-10 md:h-16">Firebase</FirebaseSVG>
            <ChatGPTSVG className="h-10 md:h-16">ChatGPT</ChatGPTSVG>
          </div>
          <div
            className="
            text-3xl
            font-normal
            text-black
            lg:text-4xl"
          >
            Start your next{' '}
            <TypeAnimation
              className="type block font-extrabold sm:inline"
              sequence={[
                'Ecommerce',
                3000,
                'Educational',
                3000,
                'AI/ML',
                3000,
                'Blockchain',
                3000,
                'Scientific 🔭',
                4000,
                'Portfolio',
                3000,
              ]}
              cursor={false}
              omitDeletionAnimation={true}
              wrapper="span"
              repeat={Infinity}
            />
            <p>
              project in a <span className="underline">minutes</span> not weeks.
            </p>
          </div>
        </article>
        {user && (
          <div className="flex h-48 flex-col items-center justify-center">
            <Loader classNames="h-8 fill-gray-900" visible={isLoading} />
            {!isLoading && (
              <>{isSubscriber ? <DownloadButton /> : <StripeButton />}</>
            )}
          </div>
        )}
        <div className="flex flex-col items-center justify-center gap-4 p-10">
          <h1
            className="flex
            flex-col
            items-center
            whitespace-nowrap
            text-4xl
            font-extrabold
            text-black
            sm:flex-row
            md:text-5xl"
          >
            {`What's included:`}
          </h1>
          <article className="flex flex-col gap-4">
            <h1 className="text-md text-black">
              ✔️ Next.js 13 – starter package with project structure,
              configuration, and SSR.
            </h1>
            <h1 className="text-md text-black">
              ✔️ SEO-friendly React + Typescript full-stack site with
              minimalistic design.
            </h1>
            <h1 className="text-md text-black">
              ✔️ Firebase Authentication workflows with public and protected
              pages.
            </h1>
            <h1 className="text-md text-black">✔️ ChatGPT integration.</h1>
            <h1 className="text-md text-black">
              ✔️ Serverless API with Cloud functions.
            </h1>
            <h1 className="text-md text-black">
              ✔️ Firebase Firestore database integration.
            </h1>
            <h1 className="text-md text-black !font-minion">
              ✔️ Firebase Storage access with custom claims.
            </h1>
            <h1 className="text-md text-black">✔️ TailwindCSS.</h1>
            <h1 className="text-md inline text-black">
              ✔️{' '}
              <Link
                href="https://vercel.com"
                target="_blank"
                className="mx-1 underline"
              >
                Vercel.com
              </Link>{' '}
              cloud deployment ready.
            </h1>
            <h1 className="text-md inline text-black">
              ✔️{' '}
              <Link
                href="https://stripe.com"
                target="_blank"
                className="mx-1 underline"
              >
                Stripe.com
              </Link>{' '}
              payments integration.
            </h1>
            <h1 className="text-md text-black">✔️ Google Analytics.</h1>
            <h1 className="text-md text-black">
              ✔️ Setup instructions and this site codebase.
            </h1>
            <h1 className="text-md text-black">
              ✔️ For personal and commercial project or simply for learning.
            </h1>
          </article>
          {!user && (
            <div className="flex flex-col items-center gap-4 pt-10 text-sm md:flex-row">
              <Link href="/sign-in" prefetch={false}>
                <div
                  className="
                  flex
                  flex-row
                  items-center
                  justify-center
                  gap-2
                  rounded-3xl
                  bg-[#F7BE38]
                  py-2
                  px-4
                  text-lg
                  font-extrabold
                  text-black
                  outline-none
                  ring-4
                  ring-[#F7BE38]/50
                  hover:bg-[#F7BE38]/90"
                >
                  Sign in
                  <LoginIcon className="h-5" />
                </div>
              </Link>
              to purchase the package.
            </div>
          )}
          <div className="markdown-body w-full pt-5 text-sm md:w-1/2">
            <GettingStarted />
          </div>
          <div className="markdown-body w-full pt-5 text-sm md:w-1/2">
            <ChatGPT />
          </div>
          <div className="markdown-body w-full pt-5 text-sm md:w-1/2">
            <Firebase />
          </div>
          <div className="markdown-body w-full pt-5 text-sm md:w-1/2">
            <CloudFunctionsDemo />
          </div>
          <div className="markdown-body w-full pt-5 text-sm md:w-1/2">
            <StripeButtonDemo />
          </div>
          <div className="markdown-body w-full pt-5 text-sm md:w-1/2">
            <Storage />
          </div>
          <div className="markdown-body w-full pt-5 text-sm md:w-1/2">
            <DeployToVercel />
          </div>
          <div className="mt-10 flex flex-col gap-4 text-center text-sm text-neutral-400">
            <div className="flex flex-row gap-6">
              <p>
                Email: <span className="underline">hello.nextjs@gmail.com</span>
              </p>
            </div>
            <p>Copyright © {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
