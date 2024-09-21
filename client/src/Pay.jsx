
import React, { useEffect, useState } from "react";
// import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import newRequest from "../../utils/newRequest";
import newRequest from "./utils/newRequest";
import { useParams } from "react-router-dom";
// import CheckoutForm from "../../components/checkoutForm/checkoutForm";
import CheckoutForm from "./Checkoutform";

const stripePromise = loadStripe(
  "pk_test_51PvJrCFnPX0HQsMmNKkRlXhur59ZoBelMeu1Nbr0aIzl5WQ9s58nOUUpAQVH7cCs8Gn0FztwYB9GKH9GOyWZA7UG00FAPvcAk8"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams(); 

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm tokenId={id}/>
        </Elements>
      )}
  </div>;
};

export default Pay;
