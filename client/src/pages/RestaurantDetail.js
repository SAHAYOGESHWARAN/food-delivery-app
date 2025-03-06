import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Feedback from '../components/Feedback';

const RestaurantDetail = ({ match }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await axios.get(`/api/reviews/${match.params.id}`);
            setReviews(response.data);
        };
        fetchReviews();
    }, [match.params.id]);

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
            <Feedback restaurantId={match.params.id} onReviewSubmitted={fetchReviews} />
        </div>
    );
};

export default RestaurantDetail;