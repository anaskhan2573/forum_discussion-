const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Question = require("../models/Question");

// Set storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });

// POST a new question
router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, tags, postedBy } = req.body;

  try {
    const newQuestion = new Question({
      title,
      description,
      tags: JSON.parse(tags),
      postedBy: JSON.parse(postedBy),
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error("Error saving question:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
