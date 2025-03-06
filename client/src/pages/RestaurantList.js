import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await axios.get('/api/restaurants');
            setRestaurants(response.data);
        };
        fetchRestaurants();
    }, []);

    return (
        <div>
            <h1>Restaurants</h1>
            <SearchBar setRestaurants={setRestaurants} />
            <ul>
                {restaurants.map(restaurant => (
                    <li key={restaurant._id}>{restaurant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;