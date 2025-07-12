// src/pages/Login.jsx
import React, { useState } from "react";
import "./auth.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        alert("✅ Login successful");
        console.log("User:", data.user);
        // Optional: store in localStorage
        // localStorage.setItem("user", JSON.stringify(data.user));
        // window.location.href = "/";
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to StackIt</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
