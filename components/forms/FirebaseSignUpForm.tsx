import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from '@firebase/auth';
import { User } from 'firebase/auth';
import { signIn } from '@/firebase/clientUserSessionUtils';
import { clientAuth } from '@/firebase/clientFirebaseApps';
import { isEmailCorrect, isPasswordStrong } from '@/utils/auth';
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import GoogleSVG from '@/components/icons/GoogleSVG';
import Loader from '@/components/loader/Loader';
import Link from 'next/link';
import { LoginIcon } from '@heroicons/react/solid';
import FirebaseSignInForm from '@/components/forms/FirebaseSignInForm';

type FirebaseSignUpFormProps = {};
const FirebaseSignUpForm = ({}: FirebaseSignUpFormProps) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');

  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isConfirmValid, setIsConfirmValid] = useState<boolean>(true);

  const [showValidationMessages, setShowValidationMessages] =
    useState<boolean>(false);

  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const signInUser = async (user: User) => {
    await signIn(user);
    await router.refresh();
  };

  const continueWithProvider = async (provider: GoogleAuthProvider) => {
    try {
      const { user } = await signInWithPopup(clientAuth, provider);
      await signInUser(user);
    } catch (error: any) {
      setLoading(false);
      if (error?.code === 'auth/email-already-in-use') {
        setAuthError('Email already in use.');
      }
    }
  };

  const proceedWithEmailSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (isEmailValid && step === 0) {
      setLoading(true);
      const methods = await fetchSignInMethodsForEmail(clientAuth, email);
      if (methods.includes('google.com')) {
        await continueWithProvider(googleProvider);
      } else {
        setLoading(false);
        setStep(1);
      }
    } else {
      setShowValidationMessages(true);
    }
  };

  const signUpWithEmailSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (
      email &&
      isEmailValid &&
      password &&
      isPasswordValid &&
      confirm &&
      isConfirmValid
    ) {
      setLoading(true);
      setAuthError(null);
      try {
        const { user } = await createUserWithEmailAndPassword(
          clientAuth,
          email,
          password,
        );
        await signInUser(user);
      } catch (error: any) {
        if (error?.code === 'auth/email-already-in-use') {
          setAuthError('Email already in use.');
        }
        setLoading(false);
      }
    } else {
      setShowValidationMessages(true);
    }
  };

  useEffect(() => {
    setIsEmailValid(isEmailCorrect(email));
    setIsPasswordValid(isPasswordStrong(password));
    setIsConfirmValid(password.localeCompare(confirm) === 0);
  }, [email, password, confirm]);

  useEffect(() => {
    setShowValidationMessages(false);
  }, [step]);

  return (
    <>
      {!showSignIn && (
        <div className="flex flex-col items-center justify-center gap-4">
          {step === 1 && (
            <button
              className="flex h-8 cursor-pointer flex-row items-center gap-1 text-sm font-semibold hover:text-blue-700"
              onClick={() => setStep(0)}
            >
              <ArrowCircleLeftIcon className="h-4" /> All sign-up options
            </button>
          )}
          {step === 0 && (
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
              Continue with Google
            </button>
          )}
          <form
            onSubmit={proceedWithEmailSubmit}
            className={`flex w-full flex-col gap-4 ${step === 1 && 'hidden'}`}
          >
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
              Proceed with Email
            </button>
          </form>
          <form
            onSubmit={signUpWithEmailSubmit}
            className={`flex w-full flex-col gap-4 ${step === 0 && 'hidden'}`}
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
            <input
              className={`rounded-md border border-gray-400 p-1 px-2 py-1.5 text-sm ${
                !isPasswordValid &&
                showValidationMessages &&
                'outline outline-2 outline-offset-2 outline-red-600'
              }`}
              type="password"
              placeholder="Password"
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
            {authError && (
              <p className="flex flex-row gap-1 text-sm text-red-700">
                {authError}
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
              Sign up
            </button>
          </form>
          <div className="flex flex-row gap-2 text-sm">
            Already have an account?{' '}
            <button onClick={() => setShowSignIn(true)}>
              <div className="flex cursor-pointer gap-1 font-semibold hover:text-blue-700">
                Sign in
                <LoginIcon className="h-5" />
              </div>
            </button>
          </div>
        </div>
      )}
      {showSignIn && <FirebaseSignInForm />}
    </>
  );
};

export default FirebaseSignUpForm;
