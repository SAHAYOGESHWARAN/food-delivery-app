import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = ({ amount }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return; // Ensure Stripe.js has loaded

        setLoading(true);
        setError(null); // Reset error state
        setSuccess(false); // Reset success state

        const cardElement = elements.getElement(CardElement);
        const response = await axios.post('/api/payment/create-payment-intent', { amount });
        const { clientSecret } = response.data;

        const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (stripeError) {
            setError(stripeError.message);
        } else {
            // Payment successful
            setSuccess(true);
            alert('Payment successful!');
        }
        setLoading(false);
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handlePayment}>
                <CardElement className="card-element" />
                <button type="submit" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Payment successful!</p>}
        </div>
    );
};

export default Checkout;