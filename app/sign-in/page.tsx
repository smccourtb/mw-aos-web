'use client';

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@firebase/auth';
import type { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import GoogleSVG from '@/components/icons/GoogleSVG';
import Loader from '@/components/loader/Loader';
import { clientAuth } from '@/firebase/clientFirebaseApps';
import { signIn } from '@/firebase/clientUserSessionUtils';
import { isEmailCorrect } from '@/utils/auth';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showValidationMessages, setShowValidationMessages] =
    useState<boolean>(false);

  const googleProvider = new GoogleAuthProvider();

  const signInUser = async (user: User) => {
    await signIn(user);
    await router.refresh();
  };

  useEffect(() => {
    setIsEmailValid(isEmailCorrect(email));
    setIsPasswordValid(password.length > 0);
  }, [email, password]);

  const continueWithProvider = async (provider: GoogleAuthProvider) => {
    try {
      const { user } = await signInWithPopup(clientAuth, provider);
      await signInUser(user);
    } catch (error: any) {
      // @ts-nocheck
    }
  };

  const signInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmailValid && password.length > 0) {
      setLoading(true);
      setAuthError(null);
      try {
        const { user } = await signInWithEmailAndPassword(
          clientAuth,
          email,
          password,
        );
        await signInUser(user);
      } catch (error: any) {
        if (error?.code === 'auth/wrong-password') {
          setAuthError('Wrong password.');
        }
        if (error?.code === 'auth/user-not-found') {
          setAuthError('User not found.');
        }
        setLoading(false);
      }
    } else {
      setShowValidationMessages(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="self-center text-2xl font-semibold">Welcome back</p>
      <button
        className="
            flex
            w-full
            cursor-pointer
            flex-row
            items-center
            justify-center
            gap-2
            rounded-md
            border
            border-gray-400
            bg-white
            px-2
            py-1.5
            text-sm
            font-semibold
            focus:outline-offset-2"
        onClick={() => continueWithProvider(googleProvider)}
      >
        <GoogleSVG className="h-5 w-5" />
        Sign in with Google
      </button>
      <form onSubmit={signInWithEmail} className="flex w-full flex-col gap-4">
        <p className="flex items-center justify-center text-sm">or</p>
        <input
          className={`rounded-md border border-gray-400 p-1 px-2 py-1.5 text-sm ${
            !isEmailValid &&
            showValidationMessages &&
            'outline outline-2 outline-offset-2 outline-red-600'
          }`}
          type="text"
          placeholder="Email"
          value={email}
          name="email"
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className={`rounded-md border border-gray-400 p-1 px-2 py-1.5 text-sm ${
            !isPasswordValid &&
            showValidationMessages &&
            'outline outline-2 outline-offset-2 outline-red-600'
          }`}
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          autoComplete="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {authError && <p className="text-sm text-red-700">{authError}</p>}
        <button
          className="
              flex
              flex-row
              items-center
              justify-center
              gap-2
              rounded-md
              border
              border-gray-900
              bg-gray-900
              px-2
              py-1.5
              text-sm
              font-semibold
              text-white
              focus:outline-offset-2"
          type="submit"
          disabled={isLoading}
        >
          <Loader classNames="h-4 w-4 fill-blue-400" visible={isLoading} />
          Sign In
        </button>
      </form>
      <div className="flex flex-row gap-2 text-sm">
        <Link href="/sign-up" replace>
          <div className="cursor-pointer font-semibold hover:text-blue-700">
            Create an account
          </div>
        </Link>
        {'|'}
        <Link href="/forgot-password" replace>
          <div className="flex cursor-pointer gap-1 font-semibold hover:text-blue-700">
            Forgot password?
          </div>
        </Link>
      </div>
    </div>
  );
}
