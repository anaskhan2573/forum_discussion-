import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import Quill from "quill";
import Emoji from "quill-emoji";

import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import "./ask.css";

Quill.register("modules/emoji", Emoji);

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image", "emoji"],
        ["clean"]
      ],
    },
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user")) || {
      name: "Anonymous",
      avatar: "https://i.pravatar.cc/40"
    };

    const tagsArray = tags.split(",").map(tag => tag.trim());

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tagsArray));
    formData.append("postedBy", JSON.stringify(user));
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch("http://localhost:8000/api/questions", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        alert("❌ " + error.message);
        return;
      }

      alert("✅ Question posted!");
      navigate("/");
    } catch (error) {
      console.error("Post Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="ask-container">
      <h2>Ask a Public Question</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Title</label>
        <input
          type="text"
          placeholder="e.g. How to use useEffect in React?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={modules}
          theme="snow"
          placeholder="Explain your question in detail..."
        />

        <label>Tags (comma separated)</label>
        <input
          type="text"
          placeholder="e.g. react, javascript"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <label>Attach Image (optional)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Post Question</button>
      </form>
    </div>
  );
};

export default AskQuestion;
