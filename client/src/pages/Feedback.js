import React, { useState } from 'react';
import axios from 'axios';

const Feedback = ({ restaurantId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/reviews', { user: 'userId', restaurant: restaurantId, rating, comment });
        setComment('');
        setRating(0);
        // Call the callback to refresh reviews
        onReviewSubmitted();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (1-5)" min="1" max="5" required />
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment" required />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default Feedback;