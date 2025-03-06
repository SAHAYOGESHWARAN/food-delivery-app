import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await axios.get('/api/admin/restaurants');
            setRestaurants(response.data);
        };
        fetchRestaurants();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Restaurants</h2>
            <ul>
                {restaurants.map(restaurant => (
                    <li key={restaurant._id}>{restaurant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;