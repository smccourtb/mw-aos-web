import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';

import { db, serverAuth } from '@/firebase/serverFirebaseApps';

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

export const getOrCreateFirestoreUser = async (uid: string | undefined) => {
  if (!uid) return null;

  const firestoreUser = await db.collection('users').doc(uid).get();

  if (!firestoreUser.exists) {
    const user = {
      games: [],
      userName: '',
      role: 1,
    };

    await db.collection('users').doc(uid).set(user);
    return user;
  }

  return firestoreUser.data();
};

export const userSession = async () => {
  const nextCookies = cookies();
  if (!nextCookies.has('session')) {
    return null;
  }

  const cookie = nextCookies.get('session');

  const authData = await serverAuth
    .verifySessionCookie(cookie?.value as string)
    .then((DecodedToken) => DecodedToken)
    .catch((e) => console.log('e', e));

  if (authData) {
    const firestoreUser = await getOrCreateFirestoreUser(authData.uid);
    await getAuth().setCustomUserClaims(authData.uid, { firestoreUser });
    // const isSubscriber = await isUserSubscriber(authData.uid);
    // if (isSubscriber) {
    //   await getAuth().setCustomUserClaims(authData.uid, { subscriber: true });
    // }
  }

  return authData;
};
