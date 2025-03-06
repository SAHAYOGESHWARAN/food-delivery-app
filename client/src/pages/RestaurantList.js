import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import './RestaurantList.css'; // Import your CSS file for styling

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [restaurantsPerPage] = useState(5); // Number of restaurants per page

    useEffect(() => {
        const fetchRestaurants = async () => {
            setLoading(true);
            setError(null); // Reset error state
            try {
                const response = await axios.get('/api/restaurants');
                setRestaurants(response.data);
            } catch (err) {
                setError('Error fetching restaurants. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    // Pagination logic
    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
    const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

    return (
        <div className="restaurant-list-container">
            <h1>Restaurants</h1>
            <SearchBar setRestaurants={setRestaurants} />
            {loading && <p>Loading restaurants...</p>}
            {error && <p className="error-message">{error}</p>}
            {restaurants.length === 0 && !loading && <p>No restaurants found.</p>}
            <ul>
                {currentRestaurants.map(restaurant => (
                    <li key={restaurant._id}>{restaurant.name}</li>
                ))}
            </ul>
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default RestaurantList;