const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Question = require("../models/Question");


// 🛠️ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ POST a new question with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, tags, postedBy } = req.body;

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
