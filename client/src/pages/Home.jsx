import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiMessageSquare, FiPlus, 
  FiBell, FiMenu, FiX, FiSearch, FiHome, 
  FiUsers, FiMail, FiUser, FiThumbsUp 
} from "react-icons/fi";
import "./home.css";

const Home = () => {
  // Dummy questions data
  const dummyQuestions = [
    {
      _id: "1",
      title: "How to center a div in CSS?",
      description: "I've been trying to center a div both horizontally and vertically but nothing seems to work. What's the best modern approach?",
      votes: 15,
      tags: ["css", "frontend", "web-development"],
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      postedBy: {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
      }
    },
    {
      _id: "2",
      title: "React useState hook not updating immediately",
      description: "When I try to use useState in my React component, the state doesn't update right away. Why is this happening and how can I fix it?",
      votes: 8,
      tags: ["react", "javascript", "hooks"],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      postedBy: {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
      }
    },
    {
      _id: "3",
      title: "Best way to learn Node.js for beginners",
      description: "I'm new to backend development and want to learn Node.js. What resources and projects would you recommend for a complete beginner?",
      votes: 23,
      tags: ["nodejs", "javascript", "backend"],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      postedBy: {
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg"
      }
    },
    {
      _id: "4",
      title: "Difference between let, const and var in JavaScript",
      description: "Can someone explain the key differences between these variable declarations with practical examples?",
      votes: 42,
      tags: ["javascript", "es6"],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      postedBy: {
        name: "Sarah Williams",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg"
      }
    }
  ];

  // Dummy answers data
  const dummyAnswers = [
    {
      _id: "a1",
      content: "You can use flexbox. Just add these styles to the parent: display: flex; justify-content: center; align-items: center;",
      votes: 5,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      userAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
      userName: "Mike Brown"
    },
    {
      _id: "a2",
      content: "Another approach is using CSS Grid: display: grid; place-items: center; This works well for modern browsers.",
      votes: 3,
      createdAt: new Date(Date.now() - 2700000).toISOString(),
      userAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      userName: "Emily Davis"
    }
  ];

  const [questions, setQuestions] = useState(dummyQuestions);
  const [user, setUser] = useState({
    _id: "u1",
    name: "Ajay",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg"
  });
  const [activeQuestion, setActiveQuestion] = useState(dummyQuestions[0]);
  const [answers, setAnswers] = useState(dummyAnswers);
  const [sortBy, setSortBy] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const navigate = useNavigate();

  // Rest of your existing functions remain the same
  const handleQuestionClick = (question) => {
    setActiveQuestion(question);
    // For demo purposes, we'll just use the dummy answers
    setAnswers(dummyAnswers);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const sortAnswers = (sortType, answersToSort = answers) => {
    const sortedAnswers = [...answersToSort];
    switch (sortType) {
      case "top":
        sortedAnswers.sort((a, b) => (b.votes || 0) - (a.votes || 0));
        break;
      case "newest":
        sortedAnswers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        sortedAnswers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }
    setAnswers(sortedAnswers);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    sortAnswers(newSort);
    setShowSortDropdown(false);
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  const handlePostAnswer = (e) => {
    e.preventDefault();
    if (!newAnswer.trim() || !user || !activeQuestion) return;
    
    const newAnswerObj = {
      _id: `a${answers.length + 1}`,
      content: newAnswer,
      votes: 0,
      createdAt: new Date().toISOString(),
      userAvatar: user.avatar,
      userName: user.name
    };
    
    setAnswers([...answers, newAnswerObj]);
    setNewAnswer("");
  };

  const handleLikeQuestion = (questionId) => {
    if (!user) return;
    
    setQuestions(questions.map(q => 
      q._id === questionId ? {...q, votes: (q.votes || 0) + 1} : q
    ));
    
    if (activeQuestion && activeQuestion._id === questionId) {
      setActiveQuestion({...activeQuestion, votes: (activeQuestion.votes || 0) + 1});
    }
  };

  const handleLikeAnswer = (answerId) => {
    if (!user) return;
    
    setAnswers(answers.map(a => 
      a._id === answerId ? {...a, votes: (a.votes || 0) + 1} : a
    ));
  };

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="stackit-app">
      {/* Header - remains the same as your original */}
      <header className="app-header">
        <div className="header-container">
          <div className="logo-container">
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="logo">
              <span className="logo-stack">Stack</span>
              <span className="logo-it">It</span>
            </h1>
          </div>
          
          <div className="nav-icons">
            <Link to="/" className="nav-icon active">
              <FiHome size={22} />
              <span>Home</span>
            </Link>
            <Link to="/network" className="nav-icon">
              <FiUsers size={22} />
              <span>Network</span>
            </Link>
            <Link to="/messages" className="nav-icon">
              <FiMail size={22} />
              <span>Messages</span>
            </Link>
            <Link to="/notifications" className="nav-icon">
              <FiBell size={22} />
              <span>Notifications</span>
            </Link>
            <Link to="/profile" className="nav-icon profile-icon">
              <FiUser size={22} />
              <span>Profile</span>
            </Link>
          </div>
          
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="user-actions">
            {user ? (
              <div className="user-profile">
                <img src={user.avatar} alt={user.name} />
                <div className="profile-dropdown">
                  <span>{user.name}</span>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">Log in</Link>
                <Link to="/register" className="signup-btn">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu - remains the same */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/ask">Ask Question</Link>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="app-content">
        {/* Left Sidebar - Question List */}
        <aside className="questions-sidebar">
          <div className="sidebar-header">
            <h2>Recent Questions</h2>
            <button 
              className="ask-question-btn"
              onClick={() => navigate("/ask")}
            >
              <FiPlus size={18} /> Ask Question
            </button>
          </div>
          
          <div className="questions-list">
            {filteredQuestions.map((q) => (
              <div 
                key={q._id} 
                className={`question-card ${activeQuestion?._id === q._id ? 'active' : ''}`}
                onClick={() => handleQuestionClick(q)}
              >
                <div className="question-votes">
                  <span>{q.votes || 0}</span>
                  <span>votes</span>
                </div>
                <div className="question-content">
                  <h3>{q.title}</h3>
                  <p className="question-excerpt">{q.description.slice(0, 120)}...</p>
                  <div className="question-footer">
                    <div className="question-tags">
                      {q.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                      {q.tags.length > 2 && (
                        <span className="more-tags">+{q.tags.length - 2}</span>
                      )}
                    </div>
                    <div className="question-meta">
                      <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                      <span>• {q?.postedBy?.name || "Anonymous"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Discussion Area */}
        <section className="discussion-area">
          {activeQuestion && (
            <>
              {/* Question Post */}
              <div className="post-card">
                <div className="post-header">
                  <img 
                    src={activeQuestion?.postedBy?.avatar || "https://i.pravatar.cc/40"} 
                    alt="author" 
                    className="post-author-avatar"
                  />
                  <div className="post-author-info">
                    <h3>{activeQuestion?.postedBy?.name || "Anonymous"}</h3>
                    <p className="post-meta">
                      Asked on {new Date(activeQuestion.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="post-content">
                  <h2 className="post-title">{activeQuestion.title}</h2>
                  <p className="post-text">{activeQuestion.description}</p>
                  {activeQuestion.tags.length > 0 && (
                    <div className="post-tags">
                      {activeQuestion.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="post-stats">
                  <span className="likes">{activeQuestion.votes || 0} votes</span>
                  <span className="comments">{answers.length} answers</span>
                </div>
                
                <div className="post-actions">
                  <button 
                    className="post-action-btn"
                    onClick={() => handleLikeQuestion(activeQuestion._id)}
                  >
                    <FiThumbsUp size={18} />
                    <span>Upvote</span>
                  </button>
                  <button 
                    className="post-action-btn"
                    onClick={() => document.querySelector('.answer-form textarea')?.focus()}
                  >
                    <FiMessageSquare size={18} />
                    <span>Answer</span>
                  </button>
                </div>
              </div>

              {/* Answers Section */}
              <div className="answers-section">
                <div className="section-header">
                  <h2>
                    <FiMessageSquare size={20} />
                    {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
                  </h2>
                  <div className="sort-options">
                    <div className="sort-dropdown" onClick={toggleSortDropdown}>
                      <span>Sorted by: <strong>{sortBy}</strong> ▼</span>
                      {showSortDropdown && (
                        <div className="dropdown-menu">
                          <button 
                            className={sortBy === 'top' ? 'active' : ''}
                            onClick={() => handleSortChange('top')}
                          >
                            Top Votes
                          </button>
                          <button 
                            className={sortBy === 'newest' ? 'active' : ''}
                            onClick={() => handleSortChange('newest')}
                          >
                            Newest
                          </button>
                          <button 
                            className={sortBy === 'oldest' ? 'active' : ''}
                            onClick={() => handleSortChange('oldest')}
                          >
                            Oldest
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {answers.length === 0 ? (
                  <div className="no-answers">
                    <p>No answers yet. Be the first to respond!</p>
                  </div>
                ) : (
                  <div className="answers-list">
                    {answers.map((answer) => (
                      <div 
                        key={answer._id} 
                        className="answer-card"
                      >
                        <div className="answer-header">
                          <img 
                            src={answer?.userAvatar || "https://i.pravatar.cc/40"} 
                            alt="author" 
                            className="answer-author-avatar"
                          />
                          <div className="answer-author-info">
                            <h4>{answer?.userName || "Anonymous"}</h4>
                            <p className="answer-meta">
                              Answered on {new Date(answer.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="answer-content">
                          <p>{answer.content}</p>
                        </div>
                        
                        <div className="answer-actions">
                          <button 
                            className="action-btn upvote"
                            onClick={() => handleLikeAnswer(answer._id)}
                          >
                            <FiThumbsUp size={16} />
                            <span>Upvote ({answer.votes || 0})</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {user && (
                  <form className="answer-form" onSubmit={handlePostAnswer}>
                    <h3>Your Answer</h3>
                    <textarea 
                      placeholder="Write your answer here..."
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      required
                    ></textarea>
                    <div className="form-actions">
                      <button type="submit" className="submit-btn">Post Answer</button>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
        </section>

        {/* Right Sidebar - remains the same */}
        <aside className="info-sidebar">
          <div className="sidebar-widget">
            <h3>About StackIt</h3>
            <p>
              StackIt is a Q&A platform for developers to share knowledge and solve problems together.
            </p>
          </div>
          
          <div className="sidebar-widget">
            <h3>Popular Tags</h3>
            <div className="tags-cloud">
              {['javascript', 'react', 'nodejs', 'python', 'css', 'html', 'typescript'].map(tag => (
                <Link to={`/tags/${tag}`} key={tag} className="tag">{tag}</Link>
              ))}
            </div>
          </div>
          
       
        </aside>
      </main>
    </div>
  );
};

export default Home;