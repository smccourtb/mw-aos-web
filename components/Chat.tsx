'use client';

import '@/lib/docs/mdx_prism_github.css';

import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import React from 'react';

import AuthContext from '@/context/AuthContext';

type Props = {
  user: DecodedIdToken | null;
  children: React.ReactNode;
};

const Chat = ({ user, children }: Props) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default Chat;
