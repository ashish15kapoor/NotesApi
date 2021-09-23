module.exports = (app) => {
  const notes = require("../controllers/note.controller.js");

  app.post("/notes", notes.createNote);

  app.get("/notes", notes.fetchAllNotes);

  app.get("/notes/:noteId", notes.findNote);

  app.put("/notes/:noteId", notes.updateNote);

  app.patch("/notes/:noteId", notes.updateNote);

  app.delete("/notes/:noteId", notes.deleteNote);
};
