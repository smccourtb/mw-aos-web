import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';

import { db, serverAuth } from '@/firebase/serverFirebaseApps';

const tokenName = process.env.NEXT_PUBLIC_FIREBASE_TOKEN as string;

export const isUserSubscriber = async (
  user_uid: string | undefined,
): Promise<boolean> => {
  if (!user_uid) {
    return false;
  }

  const paymentsRef = db
    .collection('customers')
    .doc(user_uid)
    .collection('payments');
  const payments: any = [];
  await paymentsRef.get().then((snapshot) => {
    snapshot.forEach((doc) => payments.push(doc.data()));
  });

  const succeeded = payments?.find(
    (payment: any) => payment.status === 'succeeded',
  );

  return !!succeeded;
};

export const userSession = async () => {
  const nextCookies = cookies();
  if (!nextCookies.has(tokenName)) {
    return null;
  }

  const cookie = nextCookies.get(tokenName);

  const authData = await serverAuth
    .verifyIdToken(cookie?.value as string)
    .then((DecodedToken) => DecodedToken)
    .catch(() => null);

  if (authData) {
    const isSubscriber = await isUserSubscriber(authData.uid);
    if (isSubscriber) {
      await getAuth().setCustomUserClaims(authData.uid, { subscriber: true });
    }
  }

  return authData;
};
