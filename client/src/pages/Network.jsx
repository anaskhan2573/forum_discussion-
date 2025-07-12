// src/pages/Network.jsx
import React, { useState } from 'react';
import './network.css';

const Network = () => {
  const [connectionRequests, setConnectionRequests] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      mutualConnections: 5,
      occupation: 'Software Developer at TechCorp',
      requestTime: '2 days ago'
    },
    {
      id: 2,
      name: 'Priya Patel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      mutualConnections: 12,
      occupation: 'UX Designer at DesignHub',
      requestTime: '1 week ago'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      mutualConnections: 3,
      occupation: 'Product Manager at StartUp',
      requestTime: '3 days ago'
    },
    {
      id: 4,
      name: 'Neha Gupta',
      avatar: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      mutualConnections: 8,
      occupation: 'Data Scientist at AI Labs',
      requestTime: '5 hours ago'
    }
  ]);

  const [suggestedConnections, setSuggestedConnections] = useState([
    {
      id: 5,
      name: 'Arjun Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      mutualConnections: 7,
      occupation: 'Frontend Developer at WebSolutions'
    },
    {
      id: 6,
      name: 'Sneha Reddy',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      mutualConnections: 4,
      occupation: 'Backend Engineer at CloudTech'
    },
    {
      id: 7,
      name: 'Amit Joshi',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      mutualConnections: 9,
      occupation: 'DevOps Engineer at ServerSpace'
    }
  ]);

  const [activeTab, setActiveTab] = useState('requests');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAcceptRequest = (id) => {
    setConnectionRequests(prev => prev.filter(request => request.id !== id));
    // In a real app, you would also update the backend here
  };

  const handleRejectRequest = (id) => {
    setConnectionRequests(prev => prev.filter(request => request.id !== id));
    // In a real app, you would also update the backend here
  };

  const handleConnect = (id) => {
    setSuggestedConnections(prev => prev.filter(connection => connection.id !== id));
    // In a real app, you would send a connection request here
  };

  const filteredRequests = connectionRequests.filter(request =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggestions = suggestedConnections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="network-page">
      <div className="network-header">
        <h1>My Network</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="search-icon">🔍</i>
        </div>
      </div>

      <div className="network-tabs">
        <button
          className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Connection Requests ({connectionRequests.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          Suggested Connections
        </button>
      </div>

      <div className="network-content">
        {activeTab === 'requests' ? (
          <div className="requests-list">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(request => (
                <div key={request.id} className="connection-card">
                  <div className="connection-info">
                    <img src={request.avatar} alt={request.name} className="connection-avatar" />
                    <div className="connection-details">
                      <h3>{request.name}</h3>
                      <p className="occupation">{request.occupation}</p>
                      <p className="mutual-connections">
                        {request.mutualConnections} mutual connections
                      </p>
                      <p className="request-time">{request.requestTime}</p>
                    </div>
                  </div>
                  <div className="connection-actions">
                    <button 
                      className="accept-btn"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      Accept
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No pending connection requests</p>
              </div>
            )}
          </div>
        ) : (
          <div className="suggestions-list">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map(connection => (
                <div key={connection.id} className="connection-card">
                  <div className="connection-info">
                    <img src={connection.avatar} alt={connection.name} className="connection-avatar" />
                    <div className="connection-details">
                      <h3>{connection.name}</h3>
                      <p className="occupation">{connection.occupation}</p>
                      <p className="mutual-connections">
                        {connection.mutualConnections} mutual connections
                      </p>
                    </div>
                  </div>
                  <div className="connection-actions">
                    <button 
                      className="connect-btn"
                      onClick={() => handleConnect(connection.id)}
                    >
                      Connect
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No more suggestions at this time</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Network;