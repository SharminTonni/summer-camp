import React from "react";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_CODE);
const Payment = () => {
  return (
    <div>
      <h2 className="text-3xl text-center my-12 text-red-600">
        ---------- Payment Your Booked Items ----------
      </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
