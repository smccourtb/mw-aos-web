'use client';

import {
  confirmPasswordReset,
  signInWithEmailAndPassword,
  verifyPasswordResetCode,
} from '@firebase/auth';
import type { User } from '../../firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Loader from '@/components/loader/Loader';
import { clientAuth } from '@/firebase/clientFirebaseApps';
import { signIn } from '@/firebase/clientUserSessionUtils';
import { isPasswordStrong } from '@/utils/auth';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [oobCode] = useState<string>(searchParams?.get('oobCode') || '');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isConfirmValid, setIsConfirmValid] = useState<boolean>(true);
  const [showValidationMessages, setShowValidationMessages] =
    useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCodeValid, setIsCodeValid] = useState<boolean>(false);

  const [userEmail, setEmail] = useState<string>('');

  const signInUser = async (user: User) => {
    await signIn(user);
    await router.replace('/');
  };

  useEffect(() => {
    verifyPasswordResetCode(clientAuth, oobCode)
      .then((email) => {
        setIsCodeValid(true);
        setEmail(email);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setIsCodeValid(false);
        setErrorMessage('Reset password link is not valid.');
      });
  }, [oobCode]);

  const setNewPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password && isPasswordValid && confirm && isConfirmValid) {
      setLoading(true);
      try {
        await confirmPasswordReset(clientAuth, oobCode, password);
        if (userEmail) {
          const { user } = await signInWithEmailAndPassword(
            clientAuth,
            userEmail,
            password,
          );
          await signInUser(user);
        } else {
          await router.replace('/auth');
        }
      } catch (error: any) {
        setLoading(false);
      }
    } else {
      setShowValidationMessages(true);
    }
  };

  useEffect(() => {
    setIsPasswordValid(isPasswordStrong(password));
    setIsConfirmValid(password.localeCompare(confirm) === 0);
  }, [password, confirm]);

  return (
    <>
      <div
        className={`flex h-screen flex-row items-center justify-center gap-2 text-sm ${
          isCodeValid && 'hidden'
        }`}
      >
        <Loader classNames="h-4 w-4 fill-blue-400" visible={isLoading} />
        {!errorMessage ? (
          <p className="font-semibold">Validating your reset password link.</p>
        ) : (
          <p className="font-semibold">{errorMessage}</p>
        )}
      </div>
      <div
        className={`flex h-screen flex-col items-center justify-center gap-4 ${
          !isCodeValid && 'hidden'
        }`}
      >
        <p className="self-center text-2xl font-semibold">Reset password</p>
        <form onSubmit={setNewPassword} className="flex w-full flex-col gap-4">
          <input
            className={`rounded-md border border-gray-400 p-1 px-2 py-1.5 text-sm ${
              !isPasswordValid &&
              showValidationMessages &&
              'outline outline-2 outline-offset-2 outline-red-600'
            }`}
            type="password"
            placeholder="New password"
            autoComplete="new-password"
            name="new-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            className={`rounded-md border border-gray-400 p-1 px-2 py-1.5 text-sm ${
              !isConfirmValid &&
              showValidationMessages &&
              'outline outline-2 outline-offset-2 outline-red-600'
            }`}
            type="password"
            placeholder="Confirm"
            name="confirm-password"
            autoComplete="new-password"
            onChange={(event) => setConfirm(event.target.value)}
          />
          {!isPasswordValid && showValidationMessages && (
            <p className="flex flex-row gap-1 text-sm text-red-700">
              Minimum 8 characters, at least one upper case letter and one
              number.
            </p>
          )}
          {!isConfirmValid && showValidationMessages && (
            <p className="flex flex-row gap-1 text-sm text-red-700">
              Passwords do not match.
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
            Set new password
          </button>
        </form>
      </div>
    </>
  );
}
