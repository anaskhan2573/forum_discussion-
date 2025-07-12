// src/pages/Notifications.jsx
import React from 'react';
import './notifications.css';

const Notifications = () => {
  // Dummy notifications data
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Rahul Sharma',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      post: 'My First React Project',
      time: '2 mins ago',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      post: 'CSS Grid vs Flexbox',
      comment: 'Great comparison! I learned a lot.',
      time: '15 mins ago',
      read: false
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'Vikram Singh',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'share',
      user: {
        name: 'Neha Gupta',
        avatar: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      post: 'JavaScript Tips',
      time: '3 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'event',
      title: 'Coding Workshop',
      description: 'Don\'t forget about the coding workshop tomorrow at 4 PM!',
      time: 'Yesterday',
      read: true
    },
    {
      id: 6,
      type: 'achievement',
      title: 'Pro Coder Badge',
      description: 'You earned the Pro Coder badge for completing 50 challenges!',
      time: '2 days ago',
      read: true
    }
  ];

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'follow':
        return '👤';
      case 'share':
        return '🔄';
      case 'event':
        return '📅';
      case 'achievement':
        return '🏆';
      default:
        return '🔔';
    }
  };

  const getNotificationContent = (notification) => {
    switch(notification.type) {
      case 'like':
        return (
          <>
            <strong>{notification.user.name}</strong> liked your post <strong>{notification.post}</strong>
          </>
        );
      case 'comment':
        return (
          <>
            <strong>{notification.user.name}</strong> commented on your post <strong>{notification.post}</strong>: "{notification.comment}"
          </>
        );
      case 'follow':
        return (
          <>
            <strong>{notification.user.name}</strong> started following you
          </>
        );
      case 'share':
        return (
          <>
            <strong>{notification.user.name}</strong> shared your post <strong>{notification.post}</strong>
          </>
        );
      case 'event':
        return (
          <>
            <strong>{notification.title}</strong>: {notification.description}
          </>
        );
      case 'achievement':
        return (
          <>
            <strong>{notification.title}</strong>: {notification.description}
          </>
        );
      default:
        return 'New notification';
    }
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <button className="mark-all-read">Mark all as read</button>
      </div>

      <div className="notifications-container">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`notification-card ${notification.read ? 'read' : 'unread'}`}
          >
            <div className="notification-icon">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="notification-content">
              <div className="notification-text">
                {getNotificationContent(notification)}
              </div>
              <div className="notification-time">
                {notification.time}
              </div>
            </div>

            {notification.user && (
              <div className="notification-user">
                <img 
                  src={notification.user.avatar} 
                  alt={notification.user.name} 
                  className="user-avatar"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;