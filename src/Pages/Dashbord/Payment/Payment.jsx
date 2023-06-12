import React from "react";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_CODE);
const Payment = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div>
      <h2 className="text-3xl text-center my-12 text-red-600">
        ---------- Payment Your Booked Items ----------
      </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
