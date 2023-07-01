'use client';

import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

export default function Auth({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link href="/" replace>
        <div className="absolute top-5 left-10 flex cursor-pointer items-center gap-2">
          <ArrowCircleLeftIcon className="h-8" />
          <p className="text-xl font-semibold">Back</p>
        </div>
      </Link>
      <div className="w-72">{children}</div>
    </div>
  );
}
