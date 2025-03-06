import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorites.css'; 

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFavorites = async () => {
        setLoading(true);
        setError(null); // Reset error state
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('/api/users/favorites', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavorites(response.data.favorites);
        } catch (err) {
            setError('Error fetching favorites. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="favorites-container">
            <h1>Your Favorite Restaurants</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {favorites.length === 0 && !loading && <p>No favorite restaurants found.</p>}
            {favorites.length > 0 && (
                <ul>
                    {favorites.map((restaurant) => (
                        <li key={restaurant._id}>{restaurant.name}</li>
                    ))}
                </ul>
            )}
            <button onClick={fetchFavorites} className="refresh-button">Refresh Favorites</button>
        </div>
    );
};

export default Favorites;