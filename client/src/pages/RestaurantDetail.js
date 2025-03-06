import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantDetail = ({ match }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await axios.get(`/api/reviews/${match.params.id}`);
            setReviews(response.data);
        };
        fetchReviews();
    }, [match.params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/reviews', { user: 'userId', restaurant: match.params.id, rating, comment });
        setComment('');
        setRating(0);
        // Refresh reviews
        const response = await axios.get(`/api/reviews/${match.params.id}`);
        setReviews(response.data);
    };

    return (
        <div>
            <h1>Restaurant Details</h1>
            <h2>Reviews</h2>
            <ul>
                {reviews.map(review => (
                    <li key={review._id}>
                        <strong>{review.user.name}</strong>: {review.rating} - {review.comment}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (1-5)" min="1" max="5" required />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment" required />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default RestaurantDetail;