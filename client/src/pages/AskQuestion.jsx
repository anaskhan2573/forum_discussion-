// src/pages/AskQuestion.jsx
import React, { useState } from "react";
import ReactQuill from "react-quill";
import Select from "react-select";
import "react-quill/dist/quill.snow.css";
import "./ask.css";
import axios from "axios";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  const tagOptions = [
    { value: "React", label: "React" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Node.js", label: "Node.js" },
    { value: "JWT", label: "JWT" },
    { value: "CSS", label: "CSS" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      tags: tags.map((tag) => tag.value),
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8000/api/questions", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Question posted successfully!");
      console.log(res.data);
      setTitle("");
      setDescription("");
      setTags([]);
    } catch (err) {
      console.error(err);
      alert("Failed to post question.");
    }
  };

  return (
    <div className="ask-container">
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <ReactQuill theme="snow" value={description} onChange={setDescription} />

        <label>Select Tags</label>
        <Select
          isMulti
          options={tagOptions}
          value={tags}
          onChange={setTags}
          placeholder="Choose relevant tags"
        />

        <button type="submit">Post Question</button>
      </form>
    </div>
  );
};

export default AskQuestion;
