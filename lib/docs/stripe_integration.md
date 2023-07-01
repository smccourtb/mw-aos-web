# 💳 Stripe

### Stripe with Firebase:

This extension syncs customers’ subscription status with your **Cloud Firestore** and adds custom claims using
**Firebase Authentication** for convenient access control in your application.

### Stripe extension setup:

1. Create an account at the [Stripe.com](https://stripe.com/).

2. Switch to `test mode`.

3. Create a **test** product and price at the [Stripe dashboard](https://dashboard.stripe.com/dashboard).

4. Create `Restricted key` with **write** access to `Customers`, `PaymentIntents` and `Products`.

5. Add your **Stripe Restricted API key** as variable `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, and your **Stripe Secret key** as `STRIPE_SECRET_KEY` to the `.env` file.

6. Add your **test** product's price **id** as `NEXT_PUBLIC_STRIPE_PRICE` to the `.env` file.

7. Go to [Firebase console](https://console.firebase.google.com/).

8. **Extension** -> **Explore extensions marketplace**: install **Run Payments with Stripe** extension.

9. **Extension** -> **Run Payments with Stripe** -> **Extension configuration**: Setup `Webhooks`, `API keys`, `Events` and `Security rules` following **How this extension works** guide.

10. Use `4242 4242 4242 4242` as credit card number any expiration date and cvc code.
