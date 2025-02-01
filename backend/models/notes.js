const mongoose = require("mongoose");
const NotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    min: 3,
    required: true,
  },
  description: {
    type: String,
    min: 5,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("note", NotesSchema);
