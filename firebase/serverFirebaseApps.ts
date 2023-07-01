import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import type { Auth as AuthServer } from 'firebase-admin/auth';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import adminConfig from './serverConfig';

export const serverApp = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert(adminConfig),
    });

export const db = getFirestore();
export const serverAuth: AuthServer = getAuth(serverApp);
