import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});
const defaultPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE;

const checkoutSession = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price: req.body.priceId || defaultPriceId,
          quantity: 1,
        },
      ],
      customer: req.body.stripeId,
      mode: 'payment',
      success_url: `${req.headers.origin}`,
      cancel_url: `${req.headers.origin}`,
    };

    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    res.json(session);
  } catch (error) {
    const errorMessage = 'Internal server error';
    res.status(500).json({ message: errorMessage });
  }
};

export default checkoutSession;
