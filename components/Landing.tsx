'use client';

import '@/lib/docs/mdx_prism_github.css';
import '@/styles/landing.css';

import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import React from 'react';

import AuthContext from '@/context/AuthContext';

type LandingProps = {
  user: DecodedIdToken | null;
  children: React.ReactNode;
};

const Landing = ({ user, children }: LandingProps) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default Landing;
