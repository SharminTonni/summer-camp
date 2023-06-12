import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useCart } from "../../../hooks/useCart";

const CheckoutForm = ({ price, cart }) => {
  const { user, loading } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const token = localStorage.getItem("access_token");
  const [, refetch] = useCart();
  const [cardError, setCardError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionID, setTransectionId] = useState("");
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [token, price, axiosSecure]);

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

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError);
    }
    console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status == "succeeded") {
      //   const transectionId = paymentIntent.id;
      setTransectionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        quantity: cart?.length,
        cartItems: cart.map((item) => item?._id),
        itemName: cart.map((item) => item?.name),
        menuItems: cart.map((item) => item?.classId),
        menuStudent: cart.map((item) => item?.students),
        menuSeats: cart.map((item) => item?.availableSeats),
        date: new Date(),
        status: "pending",
      };

      axiosSecure.post("/payment", payment).then((res) => {
        console.log(res.data);
        if (
          res.data.insertResult.insertedId &&
          res.data.deletedResult.deletedCount > 0
          //   res.data.updatedStudents.modifiedCount > 0 &&
          //   res.data.updatedAvailabeSeats.modifiedCount > 0
        ) {
          refetch();
          Swal.fire({
            title: "Payment successful",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      });
    }
  };

  return (
    <>
      <p>{user?.email}</p>
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
            disabled={(!stripe && !clientSecret) || processing}
          >
            Pay
          </button>
        </div>
      </form>

      {cardError && (
        <p className="text-red-600 mt-2 text-center">{cardError}</p>
      )}
      {transactionID && (
        <p className="text-green-600">TransactionId: {transactionID}</p>
      )}
    </>
  );
};

export default CheckoutForm;
