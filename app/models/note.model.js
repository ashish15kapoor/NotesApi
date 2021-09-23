const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    priority: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", NotesSchema);
