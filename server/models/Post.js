const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userType: { type: String, enum: ["Student", "Alumni", "Faculty"], required: true },
  text: { type: String, required: true },
  imageUrl: { type: String }, // optional
  likes: { type: [String], default: [] }, // userId or similar
  comments: [
    {
      user: String,
      text: String,
      createdAt: { type: Date, default: Date.now },
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);
