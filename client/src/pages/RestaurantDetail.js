import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Feedback from '../components/Feedback';
import './RestaurantDetail.css'; // Import your CSS file for styling

const RestaurantDetail = ({ match }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null); // Reset error state
            try {
                const response = await axios.get(`/api/reviews/${match.params.id}`);
                setReviews(response.data);
            } catch (err) {
                setError('Error fetching reviews. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [match.params.id]);

    const handleReviewSubmitted = async () => {
        await fetchReviews(); // Refresh reviews after a new review is submitted
    };

    return (
        <div className="restaurant-detail-container">
            <h1>Restaurant Details</h1>
            {loading && <p>Loading reviews...</p>}
            {error && <p className="error-message">{error}</p>}
            <h2>Reviews</h2>
            {reviews.length === 0 && !loading && <p>No reviews yet.</p>}
            <ul>
                {reviews.map(review => (
                    <li key={review._id}>
                        <strong>{review.user.name}</strong>: {review.rating} - {review.comment}
                    </li>
                ))}
            </ul>
            <Feedback restaurantId={match.params.id} onReviewSubmitted={handleReviewSubmitted} />
        </div>
    );
};

export default RestaurantDetail;