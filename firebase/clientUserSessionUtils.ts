import { deleteCookie, setCookie } from 'cookies-next';
import type { Auth, User } from 'firebase/auth';
import { signOut as logOut } from 'firebase/auth';

const tokenName = process.env.NEXT_PUBLIC_FIREBASE_TOKEN as string;

export const signIn = async (user: User | null): Promise<string | null> => {
  if (!user) {
    return null;
  }
  const token = await user.getIdToken();
  setCookie(tokenName, token);
  return token;
};

export const signOut = async (auth: Auth): Promise<void> => {
  await logOut(auth);
  deleteCookie(tokenName);
};
