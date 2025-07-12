// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const avatarOptions = [
  "https://api.dicebear.com/6.x/bottts/svg?seed=Tomato",
  "https://api.dicebear.com/6.x/bottts/svg?seed=Zebra",
  "https://api.dicebear.com/6.x/bottts/svg?seed=Tiger",
  "https://api.dicebear.com/6.x/bottts/svg?seed=Alien",
  "https://api.dicebear.com/6.x/bottts/svg?seed=Ghost",
];

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: avatarOptions[0],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (url) => {
    setForm((prev) => ({ ...prev, avatar: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("❌ All fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registered successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login");
      } else {
        alert("❌ " + (data.message || "Registration failed"));
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>🚀 Register to StackIt</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="name"
          placeholder="👤 Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
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

        <label>🎨 Choose Your Avatar</label>
        <div className="avatar-options">
          {avatarOptions.map((url) => (
            <img
              key={url}
              src={url}
              alt="avatar"
              className={`avatar-option ${
                form.avatar === url ? "selected" : ""
              }`}
              onClick={() => handleAvatarSelect(url)}
            />
          ))}
        </div>

        <button type="submit">📝 Register</button>
      </form>
    </div>
  );
};

export default Register;
