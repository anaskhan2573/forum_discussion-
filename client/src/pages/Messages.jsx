// src/pages/Messages.jsx
import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './messages.css';

const Messages = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      lastMessage: 'Hey, how are you doing?',
      time: '2 mins ago',
      unread: 3,
      online: true
    },
    {
      id: 2,
      name: 'Priya Patel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      lastMessage: 'Let me know about the project',
      time: '1 hour ago',
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      lastMessage: 'Meeting at 3 PM tomorrow',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: 4,
      name: 'Neha Gupta',
      avatar: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      lastMessage: 'Thanks for the help!',
      time: '2 days ago',
      unread: 0,
      online: false
    },
    {
      id: 5,
      name: 'Arjun Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      lastMessage: 'Did you see the game last night?',
      time: '1 week ago',
      unread: 0,
      online: true
    }
  ]);

  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample conversation data
  const conversations = {
    1: [
      { id: 1, text: 'Hey there!', sender: 'them', time: '10:30 AM' },
      { id: 2, text: 'Hi! How are you?', sender: 'me', time: '10:31 AM' },
      { id: 3, text: 'I\'m good, thanks for asking. How about you?', sender: 'them', time: '10:32 AM' },
      { id: 4, text: 'Doing well! Just working on some projects.', sender: 'me', time: '10:33 AM' },
      { id: 5, text: 'Hey, how are you doing?', sender: 'them', time: '2 mins ago' }
    ],
    2: [
      { id: 1, text: 'Hi Priya!', sender: 'me', time: '9:00 AM' },
      { id: 2, text: 'Hello! About the project...', sender: 'them', time: '9:05 AM' },
      { id: 3, text: 'Yes, I\'ve been working on it', sender: 'me', time: '9:10 AM' },
      { id: 4, text: 'Let me know about the project', sender: 'them', time: '1 hour ago' }
    ],
    3: [
      { id: 1, text: 'Vikram, can we meet tomorrow?', sender: 'me', time: 'Yesterday' },
      { id: 2, text: 'Sure, what time works for you?', sender: 'them', time: 'Yesterday' },
      { id: 3, text: 'How about 3 PM?', sender: 'me', time: 'Yesterday' },
      { id: 4, text: 'Meeting at 3 PM tomorrow', sender: 'them', time: 'Yesterday' }
    ],
    4: [
      { id: 1, text: 'Neha, can you help me with this problem?', sender: 'me', time: '2 days ago' },
      { id: 2, text: 'Of course, what do you need?', sender: 'them', time: '2 days ago' },
      { id: 3, text: 'Thanks for the help!', sender: 'them', time: '2 days ago' }
    ],
    5: [
      { id: 1, text: 'Arjun, did you watch the match?', sender: 'me', time: '1 week ago' },
      { id: 2, text: 'Yes! Amazing game right?', sender: 'them', time: '1 week ago' },
      { id: 3, text: 'Did you see the game last night?', sender: 'them', time: '1 week ago' }
    ]
  };

 

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = (contact) => {
    setActiveContact(contact);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate reply after 1-3 seconds
    if (Math.random() > 0.3) { // 70% chance of reply
      const replyTime = Math.floor(Math.random() * 2000) + 1000;
      setTimeout(() => {
        const replies = [
          'Sounds good!',
          'I see, thanks for letting me know',
          'Interesting!',
          'Let me think about that',
          '👍',
          'Can we talk about this later?',
          'Thanks!',
          'Awesome! 😊'
        ];
        const replyMsg = {
          id: messages.length + 2,
          text: replies[Math.floor(Math.random() * replies.length)],
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, replyMsg]);
      }, replyTime);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const onEmojiClick = (emojiData) => {
    setNewMessage(prev => prev + emojiData.emoji);
  };

  return (
    <div className="messages-page">
      <div className="contacts-sidebar">
        <div className="sidebar-header">
          <h2>Messages</h2>
          <div className="search-box">
            <input type="text" placeholder="Search messages..." />
            <i className="search-icon">🔍</i>
          </div>
        </div>

        <div className="contacts-list">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              className={`contact-card ${activeContact?.id === contact.id ? 'active' : ''}`}
              onClick={() => handleContactClick(contact)}
            >
              <div className="contact-avatar">
                <img src={contact.avatar} alt={contact.name} />
                {contact.online && <span className="online-badge"></span>}
              </div>
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p className="last-message">{contact.lastMessage}</p>
              </div>
              <div className="contact-meta">
                <span className="message-time">{contact.time}</span>
                {contact.unread > 0 && (
                  <span className="unread-count">{contact.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-container">
        {activeContact ? (
          <>
            <div className="chat-header">
              <div className="chat-user">
                <img src={activeContact.avatar} alt={activeContact.name} />
                <div>
                  <h3>{activeContact.name}</h3>
                  <p className="user-status">
                    {activeContact.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="chat-actions">
                <button>📞</button>
                <button>🖇️</button>
                <button>⋮</button>
              </div>
            </div>

            <div className="messages-area">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">{message.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input-area">
              <button 
                className="emoji-btn"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😊
              </button>
              
              {showEmojiPicker && (
                <div className="emoji-picker-container">
                  <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
                </div>
              )}

              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows="1"
              />
              
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="welcome-message">
              <h2>Select a chat to start messaging</h2>
              <p>Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;