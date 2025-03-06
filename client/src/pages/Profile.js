import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Import your CSS file for styling

const Profile = () => {
    const [user, setUser ] = useState({ name: '', email: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchUser Profile = async () => {
            setLoading(true);
            setError(null); // Reset error state
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser (response.data);
            } catch (err) {
                setError('Error fetching user profile. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchUser Profile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error state
        setSuccess(false); // Reset success state
        const token = localStorage.getItem('token');

        try {
            await axios.put('/api/users/profile', { userId: user._id, ...user }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess(true);
            alert('Profile updated successfully!');
        } catch (err) {
            setError('Error updating profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Profile updated successfully!</p>}
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser ({ ...user, name: e.target.value })}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser ({ ...user, email: e.target.value })}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => setUser ({ ...user, phone: e.target.value })}
                    placeholder="Phone"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default Profile;