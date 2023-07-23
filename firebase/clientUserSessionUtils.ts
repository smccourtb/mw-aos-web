import { deleteCookie } from 'cookies-next';
import type { Auth, User } from 'firebase/auth';
import { signOut as logOut } from 'firebase/auth';

const tokenName = process.env.NEXT_PUBLIC_FIREBASE_TOKEN as string;

export const signIn = async (user: User | null): Promise<boolean | null> => {
  if (!user) {
    return null;
  }
  const token = await user.getIdToken(true);
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      token,
    },
  });
  return response.ok;
};

export const signOut = async (auth: Auth): Promise<void> => {
  await logOut(auth);
  deleteCookie(tokenName);
};
