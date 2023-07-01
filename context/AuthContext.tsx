import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { createContext } from 'react';

export default createContext<DecodedIdToken | null>(null);
