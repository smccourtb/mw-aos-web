'use client';

import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import { sendPasswordResetEmail } from '../../firebase/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Loader from '@/components/loader/Loader';
import { clientAuth } from '@/firebase/clientFirebaseApps';
import { isEmailCorrect } from '@/utils/auth';

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [showValidationMessages, setShowValidationMessages] =
    useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [step, setStep] = useState<number>(0);

  const proceedResetPassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (email) {
      setLoading(true);
      setErrorMessage(null);
      try {
        await sendPasswordResetEmail(clientAuth, email);
        setStep(1);
      } catch (error: any) {
        if (error?.code === 'auth/user-not-found') {
          setErrorMessage('Email not found.');
        }
      }
    } else {
      setShowValidationMessages(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    setIsEmailValid(isEmailCorrect(email));
  }, [email]);

  return (
    <div className={`flex h-screen flex-col items-center justify-center gap-4`}>
      <Link href="/sign-in" replace>
        <div className="flex h-8 cursor-pointer flex-row items-center gap-1 text-sm font-semibold hover:text-blue-700">
          <ArrowCircleLeftIcon className="h-4" /> Back to sign-in options
        </div>
      </Link>
      {step === 0 && (
        <form
          onSubmit={proceedResetPassword}
          className={`flex w-full flex-col gap-4`}
        >
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
          {errorMessage && (
            <p className="flex flex-row gap-1 text-sm text-red-700">
              {errorMessage}
            </p>
          )}
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
            Send reset password link
          </button>
        </form>
      )}
      {step === 1 && (
        <div className="text-sm font-semibold">
          Reset password link is sent to your email.
        </div>
      )}
    </div>
  );
}
