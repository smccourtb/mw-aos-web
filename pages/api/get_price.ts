import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const edge = async () => {
  const resp = {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE,
    amount: 24.99,
  };

  return NextResponse.json(resp);
};

export default edge;
