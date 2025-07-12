// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1>Welcome to <span className="brand">StackIt</span>!</h1>
        <p className="subtitle">A minimal platform to ask, answer, and share knowledge with the community.</p>

        <div className="home-buttons">
          <Link to="/ask"><button className="btn green">Ask a Question</button></Link>
          <Link to="/questions"><button className="btn blue">Browse Questions</button></Link>
        </div>

        <div className="auth-buttons">
          <Link to="/login"><button className="btn gray">Login</button></Link>
          <Link to="/register"><button className="btn dark">Register</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
