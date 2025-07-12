// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetail from "./pages/QuestionDetail"; // ✅ Add this line!
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Network from "./pages/Network";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/question/:id" element={<QuestionDetail />} /> {/* ✅ Fixed */}
          <Route path="/profile" element={<Profile />} />   {/* ✅ This line is required */}
          <Route path="/notifications" element={<Notifications />} />   {/* ✅ This line is required */}
          <Route path="/messages" element={<Messages />} />   {/* ✅ This line is required */}
          <Route path="/network" element={<Network />} />   {/* ✅ This line is required */}



      </Routes>
    </Router>
  );
}

export default App;
