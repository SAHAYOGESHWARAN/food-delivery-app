import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/users/favorites', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavorites(response.data.favorites);
        };
        fetchFavorites();
    }, []);

    return (
        <div>
            <h1>Your Favorite Restaurants</h1>
            <ul>
                {favorites.map((restaurant) => (
                    <li key={restaurant._id}>{restaurant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites 