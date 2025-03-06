import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User Dashboard.css'; // Import your CSS file for styling

const UserDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null); // Reset error state
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('/api/orders/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(response.data);
            } catch (err) {
                setError('Error fetching orders. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseDetails = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="user-dashboard-container">
            <h1>Your Orders</h1>
            {loading && <p>Loading orders...</p>}
            {error && <p className="error-message">{error}</p>}
            {orders.length === 0 && !loading && <p>No orders found.</p>}
            <ul>
                {orders.map(order => (
                    <li key={order._id} onClick={() => handleOrderClick(order)}>
                        Order ID: {order._id} - Status: {order.status}
                    </li>
                ))}
            </ul>
            {selectedOrder && (
                <div className="order-details">
                    <h2>Order Details</h2>
                    <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                        {selectedOrder.items.map(item => (
                            <li key={item._id}>{item.name} - Quantity: {item.quantity}</li>
                        ))}
                    </ul>
                    <button onClick={handleCloseDetails}>Close</button>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;