'use client';

import { getDownloadURL, ref } from '@firebase/storage';
import { DownloadIcon, XCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Loader from '@/components/loader/Loader';
import { clientStorage } from '@/firebase/clientFirebaseApps';

const DownloadButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    getDownloadURL(ref(clientStorage, 'package/latest.zip'))
      .then((url) => {
        setDownloadURL(url);
        setIsLoading(false);
      })
      .catch(() => {
        setDownloadURL('');
        setError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-4 p-10">
      <Link
        href={downloadURL}
        download
        className={`${(isLoading || error) && 'pointer-events-none'}`}
      >
        <div
          className={`
            flex
            flex-row
            items-center
            justify-center
            gap-4
            rounded-3xl
            bg-[#F7BE38]
            py-4
            px-6
            text-lg
            font-extrabold
            text-gray-900
            outline-none
            ring-4
            ring-[#F7BE38]/50
            hover:bg-[#F7BE38]/90
          `}
        >
          Download Starter{' '}
          {isLoading && (
            <Loader classNames="h-8 fill-gray-900" visible={isLoading} />
          )}
          {error && <XCircleIcon className="h-8 text-red-700" />}
          {!isLoading && !error && (
            <DownloadIcon className="h-8 text-gray-900" />
          )}
        </div>
      </Link>
    </div>
  );
};

export default DownloadButton;
