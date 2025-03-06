import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css'; 

const Feedback = ({ restaurantId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error state
        setSuccess(false); // Reset success state

        try {
            await axios.post('/api/reviews', { user: 'userId', restaurant: restaurantId, rating, comment });
            setComment('');
            setRating(0);
            setSuccess(true);
            onReviewSubmitted(); // Call the callback to refresh reviews
        } catch (err) {
            setError('Error submitting review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feedback-container">
            <h2>Leave a Review</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(Math.max(1, Math.min(5, e.target.value)))}
                    placeholder="Rating (1-5)"
                    min="1"
                    max="5"
                    required
                />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Review submitted successfully!</p>}
        </div>
    );
};

export default Feedback;