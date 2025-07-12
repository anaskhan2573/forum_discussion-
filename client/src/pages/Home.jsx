import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
   FiMessageSquare, FiPlus, 
  FiBell, FiMenu, FiX, FiSearch, FiHome, 
  FiUsers, FiMail, FiUser, FiThumbsUp 
} from "react-icons/fi";
import "./home.css";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user JSON", e);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/questions");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(data);
        
        if (data.length > 0) {
          setActiveQuestion(data[0]);
          await fetchAnswers(data[0]._id);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, );

 const fetchAnswers = async (questionId) => {
  try {
    const res = await fetch(`/api/questions/${questionId}/answers`);
    if (!res.ok) {
      const errorData = await res.text();  // or res.json() if it's JSON
      throw new Error(`HTTP error! status: ${res.status} | ${errorData}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching answers:', error);
  }
};


  const handleQuestionClick = (question) => {
    setActiveQuestion(question);
    fetchAnswers(question._id);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
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

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim() || !user || !activeQuestion) return;
    
    try {
      const response = await fetch(
        `http://localhost:8000/api/questions/${activeQuestion._id}/answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newAnswer,
            userId: user._id,
            userName: user.name,
            userAvatar: user.avatar
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnswers([...answers, data]);
      setNewAnswer("");
      fetchAnswers(activeQuestion._id); // Refresh answers
    } catch (err) {
      console.error("Error posting answer:", err);
    }
  };

  const handleLikeQuestion = async (questionId) => {
    if (!user) return;
    
    try {
      const response = await fetch(
        `http://localhost:8000/api/questions/${questionId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedQuestions = questions.map(q => 
        q._id === questionId ? {...q, votes: (q.votes || 0) + 1} : q
      );
      setQuestions(updatedQuestions);
      
      if (activeQuestion && activeQuestion._id === questionId) {
        setActiveQuestion({...activeQuestion, votes: (activeQuestion.votes || 0) + 1});
      }
    } catch (err) {
      console.error("Error liking question:", err);
    }
  };

  const handleLikeAnswer = async (answerId) => {
    if (!user) return;
    
    try {
      const response = await fetch(
        `http://localhost:8000/api/answers/${answerId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedAnswers = answers.map(a => 
        a._id === answerId ? {...a, votes: (a.votes || 0) + 1} : a
      );
      setAnswers(updatedAnswers);
    } catch (err) {
      console.error("Error liking answer:", err);
    }
  };

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="stackit-app">
      {/* Header */}
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

      {/* Mobile Menu */}
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
          
          {loading ? (
            <div className="loading-questions">
              <div className="loading-spinner"></div>
              <p>Loading questions...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="no-questions">
              <p>No questions found</p>
              <button 
                className="ask-question-btn"
                onClick={() => navigate("/ask")}
              >
                <FiPlus size={18} /> Be the first to ask
              </button>
            </div>
          ) : (
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
          )}
        </aside>

        {/* Main Discussion Area */}
        <section className="discussion-area">
          {activeQuestion ? (
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
                      {new Date(activeQuestion.createdAt).toLocaleDateString()}
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
                  <span className="likes">{activeQuestion.votes || 0} likes</span>
                  <span className="comments">{answers.length} answers</span>
                </div>
                
                <div className="post-actions">
                  <button 
                    className="post-action-btn"
                    onClick={() => handleLikeQuestion(activeQuestion._id)}
                  >
                    <FiThumbsUp size={18} />
                    <span>Like</span>
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
                        className={`answer-card ${answer.isAccepted ? 'accepted' : ''}`}
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
                              Answered {new Date(answer.createdAt).toLocaleDateString()}
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
                            <span>Like ({answer.votes || 0})</span>
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
          ) : (
            <div className="no-question-selected">
              <h2>Welcome to StackIt</h2>
              <p>Select a question from the sidebar to view its details</p>
              <button 
                className="ask-question-btn"
                onClick={() => navigate("/ask")}
              >
                <FiPlus size={18} /> Ask a Question
              </button>
            </div>
          )}
        </section>

        {/* Right Sidebar */}
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
          
          <div className="sidebar-widget">
            <h3>Top Contributors</h3>
            <div className="contributors-list">
              {[
                { name: "John Doe", answers: 42 },
                { name: "Jane Smith", answers: 38 },
                { name: "Alex Johnson", answers: 35 },
                { name: "Sarah Williams", answers: 28 },
                { name: "Mike Brown", answers: 25 }
              ].map((user, index) => (
                <div key={index} className="contributor">
                  <span className="rank">{index + 1}</span>
                  <span className="name">{user.name}</span>
                  <span className="answers">{user.answers} answers</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Home;