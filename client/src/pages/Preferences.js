import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Preferences = () => {
    const [preferences, setPreferences] = useState([]);
    const [newPreference, setNewPreference] = useState('');

    useEffect(() => {
        const fetchPreferences = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/users/preferences', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPreferences(response.data.preferences);
        };
        fetchPreferences();
    }, []);

    const handleAddPreference = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.put('/api/users/preferences', { preferences: [...preferences, newPreference] }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setPreferences([...preferences, newPreference]);
        setNewPreference('');
    };

    return (
        <div>
            <h1>User Preferences</h1>
            <form onSubmit={handleAddPreference}>
                <input type="text" value={newPreference} onChange={(e) => setNewPreference(e.target.value)} placeholder="Add preference" required />
                <button type="submit">Add</button>
            </form>
            <ul>
                {preferences.map((pref, index) => (
                    <li key={index}>{pref}</li>
                ))}
            </ul>
        </div>
    );
};

export default Preferences;