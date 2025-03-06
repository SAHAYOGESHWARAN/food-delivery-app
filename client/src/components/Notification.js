import React, { useState } from 'react';
import useSocket from './useSocket';
import './Notification.css'; // Import your CSS file for styling

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useSocket('orderUpdate', (order) => {
        setNotifications((prev) => [
            ...prev,
            { id: order._id, message: `Order ${order._id} status updated to ${order.status}`, dismissed: false }
        ]);
    });

    const dismissNotification = (id) => {
        setNotifications((prev) => prev.map(notification => 
            notification.id === id ? { ...notification, dismissed: true } : notification
        ));
    };

    const unreadCount = notifications.filter(notification => !notification.dismissed).length;

    return (
        <div className="notification-container">
            <h2>Notifications {unreadCount > 0 && `(${unreadCount})`}</h2>
            <ul>
                {notifications.map((notification) => (
                    !notification.dismissed && (
                        <li key={notification.id} className="notification-item fade-in">
                            {notification.message}
                            <button onClick={() => dismissNotification(notification.id)}>Dismiss</button>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default Notification;