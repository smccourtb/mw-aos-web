'use client';

import { doc, getDoc, getFirestore } from '@firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

import Loader from '@/components/loader/Loader';
import AuthContext from '@/context/AuthContext';
import { connectStripe, postStripe } from '@/utils/stripe';

const StripeButton = () => {
  const user = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [priceData, setPriceData] = useState<{
    priceId: string;
    amount: number;
  }>();
  const { uid } = user!;

  useEffect(() => {
    fetch('/api/get_price')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPriceData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const checkOut = async () => {
    setIsLoading(true);
    const firestore = getFirestore();
    const q = doc(firestore, 'customers', uid);
    const querySnapshot = await getDoc(q);
    const customer = querySnapshot.data();

    const response = await postStripe(
      '/api/checkout_session',
      customer?.stripeId as string,
      priceData?.priceId,
    );
    ReactGA.event({
      category: 'Stripe',
      action: 'Buy click',
    });
    if (response.statusCode === 500) {
      setIsLoading(false);
      return;
    }

    const stripe = await connectStripe();
    await stripe?.redirectToCheckout({
      sessionId: response.id,
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-start gap-4 p-10">
      {isLoading ? (
        <Loader classNames="h-6 w-6 fill-gray-900" />
      ) : (
        <>
          <button
            onClick={checkOut}
            className="
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
                hover:bg-[#F7BE38]/90"
          >
            {`Download for $${priceData?.amount}`}
          </button>
          <p className="px-5 text-center text-xs text-black">
            A perpetual subscription. Next.js 13 is still in beta, so stay
            tuned!
          </p>
        </>
      )}
    </div>
  );
};

export default StripeButton;
