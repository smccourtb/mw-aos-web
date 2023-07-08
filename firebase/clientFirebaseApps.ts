import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

import clientConfig from './clientConfig';
import { connectFirestoreEmulator, getFirestore } from '@firebase/firestore';

const app = initializeApp(clientConfig);
function shouldConnectAuthEmulator(): boolean {
  // You could do any logic here to decide whether to connect to the emulator or not
  return process.env.NODE_ENV === 'development';
}

function getAuthEmulatorHost(): string {
  // You'd read this from config/environment variable/etc.
  return process.env.FIREBASE_AUTH_EMULATOR_HOST as string;
}

if (shouldConnectAuthEmulator()) {
  console.log('Connecting to the Auth Emulator!');
  connectAuthEmulator(getAuth(app), getAuthEmulatorHost());
  connectFirestoreEmulator(
    getFirestore(),
    '127.0.0.1',
    Number(process.env.FIRESTORE_EMULATOR_PORT),
  );
}
export const clientAuth = getAuth(app);
export const clientStorage = getStorage(app);
