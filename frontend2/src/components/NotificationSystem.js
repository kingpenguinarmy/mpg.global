import React, { useState, useEffect } from 'react';
import socket from '../utils/socket';

/**
 * Pre-defined styles for different types of notifications.
 */
const notificationStyles = {
  projectUpdate: { backgroundColor: '#d1e7dd' },
  milestoneReached: { backgroundColor: '#cff4fc' },
  paymentReceived: { backgroundColor: '#e0f7fa' },
  newMessage: { backgroundColor: '#f1f3f4' },
};

/**
 * NotificationSystem Component
 * 
 * This component handles the display of real-time notifications to the user.
 * It listens to various socket events to receive new notifications and updates its state accordingly.
 */
const NotificationSystem = () => {
  // State to hold the list of notifications
  const [notifications, setNotifications] = useState([]);
  // State to hold the count of unread notifications
  const [unreadCount, setUnreadCount] = useState(0);

  /**
   * Dismiss a notification based on its unique ID.
   * 
   * @param {number} id - The unique ID of the notification to be dismissed.
   */
  const dismissNotification = (id) => {
    const newNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(newNotifications);
  };

  useEffect(() => {
    /**
     * Handle new notifications from the server.
     * 
     * @param {object} notification - The new notification object received from the server.
     */
    const handleNewNotification = (notification) => {
      setNotifications(prevNotifications => [...prevNotifications, { ...notification, timestamp: notification.timestamp || new Date() }]);
      setUnreadCount(prevCount => prevCount + 1);
    };

    // List of socket events to listen to
    const events = ['newNotification', 'projectUpdate', 'milestoneReached', 'paymentReceived', 'newMessage'];
    events.forEach(event => socket.on(event, handleNewNotification));

    // Cleanup: Remove socket event listeners when the component is unmounted
    return () => {
      events.forEach(event => socket.off(event));
    };
  }, []);

  return (
    <div className="notification-system">
      <h2>Notifications ({unreadCount} unread)</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} style={notificationStyles[notification.type]}>
            {notification.message} 
            <span className="timestamp">{new Date(notification.timestamp).toLocaleTimeString()}</span>
            <button onClick={() => dismissNotification(notification.id)}>Dismiss</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationSystem;
