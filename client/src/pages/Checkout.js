import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = ({ amount }) => {
    const [error, setError] = useState(null);

    const handlePayment = async () => {
        const stripe = await stripePromise;
        const response = await axios.post('/api/payment/create-payment-intent', { amount });
        const { clientSecret } = response.data;

        const { error: stripeError } = await stripe.confirmCardPayment(clientSecret);
        if (stripeError) {
            setError(stripeError.message);
        } else {
            // Payment successful
            alert('Payment successful!');
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <button onClick={handlePayment}>Pay ${amount / 100}</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Checkout;