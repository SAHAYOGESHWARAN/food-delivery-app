import React, { useState } from 'react';
import axios from 'axios';

const Feedback = ({ restaurantId }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('/api/feedback', { restaurant: restaurantId, message }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('');
        alert('Feedback submitted successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Leave your feedback" required />
            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default Feedback;