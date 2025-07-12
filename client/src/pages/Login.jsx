// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector(".auth-container").classList.add("animate-fade-in");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 200) {
        document.querySelector(".auth-container").classList.add("animate-success");
        setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        }, 1000);
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-outer">
      <div className={`auth-container ${shake ? "animate-shake" : ""}`}>
        <h2 className="auth-title">👋 Welcome Back</h2>
        <p className="auth-subtitle">Login to your account</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`submit-btn ${isLoading ? "loading" : ""}`}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?{" "}
            <a href="/register" className="auth-link">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
