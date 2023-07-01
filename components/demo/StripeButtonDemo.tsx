'use client';

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import StripeSVG from '@/components/icons/StripeSVG';
import Loader from '@/components/loader/Loader';
import Stripe from '@/lib/docs/stripe_integration.md';
import { connectDemoStripe, postStripe } from '@/utils/stripe';

const StripeButtonDemo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const success = searchParams?.get('test_success');

  const checkOut = async () => {
    setIsLoading(true);

    const response = await postStripe(
      '/api/test_checkout_session',
      'cus_NZM8MuuZanO6VM',
    );
    if (response.statusCode === 500) {
      setIsLoading(false);
      return;
    }

    const stripe = await connectDemoStripe();
    await stripe?.redirectToCheckout({
      sessionId: response.id,
    });
    setIsLoading(false);
  };

  return (
    <div>
      <Stripe />
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
        {success === 'true' && (
          <CheckCircleIcon className="h-8 text-green-700" />
        )}
        {success === 'false' && <XCircleIcon className="h-8 text-red-700" />}
        {!success && (
          <button
            onClick={async () => checkOut()}
            className="
              flex
              flex-row
              items-center
              justify-center
              gap-2
              rounded-md
              border
              bg-[#F7BE38]
              px-3
              py-1.5
              text-sm
              font-semibold"
          >
            <Loader classNames="h-4 w-4 fill-black" visible={isLoading} />
            <StripeSVG className="h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StripeButtonDemo;
