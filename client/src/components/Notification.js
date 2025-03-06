import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000'); 

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on('orderUpdate', (order) => {
            setNotifications((prev) => [...prev, `Order ${order._id} status updated to ${order.status}`]);
        });

        return () => {
            socket.off('orderUpdate');
        };
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;