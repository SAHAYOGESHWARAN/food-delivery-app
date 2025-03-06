import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser ] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        const fetchUser Profile = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser (response.data);
        };
        fetchUser Profile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.put('/api/users/profile', { userId: user._id, ...user }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        alert('Profile updated successfully!');
    };

    return (
        <form onSubmit={handleUpdate}>
            <input type="text" value={user.name} onChange={(e) => setUser ({ ...user, name: e.target.value })} placeholder="Name" required />
            <input type="email" value={user.email} onChange={(e) => setUser ({ ...user, email: e.target.value })} placeholder="Email" required />
            <input type="text" value={user.phone} onChange={(e) => setUser ({ ...user, phone: e.target.value })} placeholder="Phone" required />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default Profile;