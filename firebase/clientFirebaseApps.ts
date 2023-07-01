import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

import clientConfig from './clientConfig';

const app = initializeApp(clientConfig);

export const clientAuth = getAuth(app);
export const clientStorage = getStorage(app);
