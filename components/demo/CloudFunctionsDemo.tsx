'use client';

import React, { useState } from 'react';

import Loader from '@/components/loader/Loader';
import CloudFunctions from '@/lib/docs/cloud_functions.md';

const CloudFunctionsDemo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);

  const getGeoData = () => {
    fetch('/api/edge')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLocation(data);
      });
  };

  return (
    <div>
      <CloudFunctions />
      <div
        className="
        flex
        w-full
        flex-col
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        p-20
        text-center"
      >
        <div className="flex h-4 flex-row items-center gap-1">
          {location?.flag} {location?.country} {location?.region}{' '}
          {location?.city}
        </div>
        <button
          onClick={() => {
            setIsLoading(true);
            getGeoData();
          }}
          className="
          flex
          flex-row
          items-center
          justify-center
          gap-2
          rounded-md
          border
          bg-gray-900
          px-5
          py-1.5
          text-sm
          font-semibold
          text-white
          focus:outline-offset-2"
        >
          <Loader classNames="h-4 w-4 fill-blue-400" visible={isLoading} />
          Run function
        </button>
      </div>
    </div>
  );
};

export default CloudFunctionsDemo;
