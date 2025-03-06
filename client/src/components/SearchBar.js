import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setRestaurants }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.get(`/api/restaurants/search?query=${searchTerm}`);
        setRestaurants(response.data);
    };

    return (
        <form onSubmit={handleSearch}>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search restaurants..." required />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;