import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Preferences.css'; // Import your CSS file for styling

const Preferences = () => {
    const [preferences, setPreferences] = useState([]);
    const [newPreference, setNewPreference] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchPreferences = async () => {
            setLoading(true);
            setError(null); // Reset error state
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('/api/users/preferences', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPreferences(response.data.preferences);
            } catch (err) {
                setError('Error fetching preferences. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchPreferences();
    }, []);

    const handleAddPreference = async (e) => {
        e.preventDefault();
        if (!newPreference.trim()) return; // Prevent adding empty preferences

        setLoading(true);
        setError(null); // Reset error state
        setSuccess(false); // Reset success state
        const token = localStorage.getItem('token');

        try {
            await axios.put('/api/users/preferences', { preferences: [...preferences, newPreference] }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPreferences([...preferences, newPreference]);
            setNewPreference('');
            setSuccess(true);
        } catch (err) {
            setError('Error adding preference. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePreference = async (preferenceToDelete) => {
        setLoading(true);
        setError(null); // Reset error state
        const token = localStorage.getItem('token');

        try {
            await axios.delete('/api/users/preferences', {
                headers: { Authorization: `Bearer ${token}` },
                data: { preference: preferenceToDelete },
            });
            setPreferences(preferences.filter(pref => pref !== preferenceToDelete));
        } catch (err) {
            setError('Error deleting preference. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="preferences-container">
            <h1>User Preferences</h1>
            <form onSubmit={handleAddPreference}>
                <input
                    type="text"
                    value={newPreference}
                    onChange={(e) => setNewPreference(e.target.value)}
                    placeholder="Add preference"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Preference added successfully!</p>}
            <ul>
                {preferences.map((pref, index) => (
                    <li key={index}>
                        {pref}
                        <button onClick={() => handleDeletePreference(pref)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Preferences;