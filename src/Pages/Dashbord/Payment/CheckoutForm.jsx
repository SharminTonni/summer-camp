import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!elements || !stripe) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      console.log(paymentMethod);
      setCardError("");
    }
  };
  return (
    <>
      <form className="w-2/3 mx-auto" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="mt-4 mx-auto text-center ">
          <button
            className="btn btn-outline btn-warning  mt-4 mx-auto"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>
        </div>
      </form>

      {cardError && (
        <p className="text-red-600 mt-2 text-center">{cardError}</p>
      )}
    </>
  );
};

export default CheckoutForm;
