// src/pages/AjayProfile.jsx
import React, { useState } from "react";
import "./profile.css";

const AjayProfile = () => {
  const [bio, setBio] = useState("High school student and aspiring footballer. Love coding in my free time!");
  const [editMode, setEditMode] = useState(false);

  // Dummy user data with boy image
  const user = {
    name: "Ajay",
    email: "ajay@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    bio: bio
  };

  // Dummy posts data with boy-related content
  const posts = [
    {
      _id: "1",
      title: "Won the School Football Tournament!",
      content: "Our team won the inter-school football championship today! Scored the winning goal in the final minutes.",
      image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      createdAt: "2025-06-15T10:30:00Z",
      likes: 56
    },
    {
      _id: "2",
      title: "Built My First Game with Python",
      content: "After months of learning, I finally built my first game - a simple snake game using Pygame!",
      image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      createdAt: "2025-06-10T14:15:00Z",
      likes: 34
    },
    {
      _id: "3",
      title: "Summer Coding Camp Experience",
      content: "Attended a 2-week coding camp this summer. Learned HTML, CSS, and JavaScript basics. Made some cool projects!",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      createdAt: "2025-06-05T09:45:00Z",
      likes: 42
    },
    {
      _id: "4",
      title: "My New Skateboard Tricks",
      content: "Mastered three new skateboard tricks this weekend! Ollie, kickflip, and boardslide are now in my arsenal.",
      image: "https://images.unsplash.com/photo-1572776685600-3f63d3cbbcb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      createdAt: "2025-05-28T16:20:00Z",
      likes: 29
    },
    {
      _id: "5",
      title: "Science Fair Project - Solar Powered Car",
      content: "Working on a solar-powered miniature car for the school science fair. The prototype works but needs improvements.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      createdAt: "2025-05-20T11:10:00Z",
      likes: 38
    }
  ];

  const handleBioUpdate = () => {
    setEditMode(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="profile-avatar"
          />
        </div>
        
        <div className="profile-info">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          
          <div className="profile-bio">
            {editMode ? (
              <>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                />
                <button onClick={handleBioUpdate}>Save</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{user.bio || "No bio yet."}</p>
                <button onClick={() => setEditMode(true)}>Edit Bio</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <h2>Your Posts ({posts.length})</h2>
        
        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post._id} className="post-card">
                <div className="post-image-container">
                  <img src={post.image} alt={post.title} className="post-image" />
                </div>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}...</p>
                <div className="post-meta">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>{post.likes} likes</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't created any posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default AjayProfile;