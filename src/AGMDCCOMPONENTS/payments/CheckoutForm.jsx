import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { showNotification } from "@mantine/notifications";
import { axiosPost } from "../apiCallHelpers/axiosCall";
import { LoadingOverlay } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({
  selectedOrder,
  setViewPaymentModal,
  viewOrder,
}) {
  const navigate = useNavigate();
  console.log("CHECKOUT: ", selectedOrder[0]);

  const order = selectedOrder[0];
  const stripe = useStripe();
  const elements = useElements();

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    const response = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    console.log("API CALL RESPONSE1", response);
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (response.error) {
      showNotification({
        title: "ERROR",
        message: "An error occurred while processing your payment",
        color: "red",
      });

      setVisible(false);
      if (
        response?.error?.type === "card_error" ||
        response?.error?.type === "validation_error"
      ) {
        setMessage(response?.error?.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      // The payment has been processed!
      setVisible(false);
      axiosPost("/payment/add", {
        orderId: order?._id,
        paymentAmount:
          order.status === "new" ? order.downPayment : order?.vehiclePrice,
        paymentType: order.status === "new" ? "customer" : "seller",
      });
      showNotification({
        title: "SUCCESS",
        message: `YOUR PAYMENT OF ${response.paymentIntent.amount} has successfully been paid`,
        color: "green",
      });
      setTimeout(() => {}, 1000);
      if (viewOrder) {
        setViewPaymentModal(false);
      } else {
        navigate("/user/viewPayments");
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      style={{ position: "relative" }}
    >
      <LoadingOverlay
        loaderProps={{
          size: "xl",
          color: "grape",
          variant: "bars",
        }}
        overlayOpacity={0.5}
        overlayColor="#c5c5c5"
        visible={visible}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className="stripeButton"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        onClick={() => setVisible(true)}
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            `Pay ${
              order.status === "new"
                ? order.downPayment.toLocaleString()
                : order?.vehiclePrice.toLocaleString()
            }`
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
