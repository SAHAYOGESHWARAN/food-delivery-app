import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css'; 

const SearchBar = ({ setRestaurants }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Debounce function to limit API calls
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;

        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = await axios.get(`/api/restaurants/search?query=${searchTerm}`);
            setRestaurants(response.data);
        } catch (err) {
            setError('Error fetching restaurants. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        setRestaurants([]); // Clear the restaurant list
    };

    // Debounced search function
    const debouncedSearch = debounce(handleSearch, 300);

    useEffect(() => {
        if (searchTerm) {
            debouncedSearch();
        } else {
            setRestaurants([]); // Clear results if search term is empty
        }
    }, [searchTerm, debouncedSearch, setRestaurants]);

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch} aria-live="polite">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search restaurants..."
                    required
                    aria-label="Search restaurants"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
                <button type="button" onClick={handleClear} disabled={!searchTerm}>
                    Clear
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SearchBar;