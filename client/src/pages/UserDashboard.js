import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/orders/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Your Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        Order ID: {order._id} - Status: {order.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;