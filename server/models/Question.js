const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  postedBy: {
    name: String,
    avatar: String,
  },
  image: {
    data: Buffer,
    contentType: String,
    originalName: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Questions", questionSchema);
