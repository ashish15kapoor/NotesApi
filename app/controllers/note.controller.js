const Note = require("../models/note.model.js");

const Ajv = require("ajv");
const ajv = new Ajv();
const NoteValidateSchema = require("../validators/note.validate.js");

exports.createNote = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data not provided",
    });
  } else {
    const validate = ajv.compile(NoteValidateSchema);
    const noteValid = validate(req.body);
    if (!noteValid) {
      return res.status(400).json(validate.errors[0]);
    }
  }

  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content,
    priority: req.body.priority,
  });

  note
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};

exports.fetchAllNotes = (req, res) => {
  Note.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while fetching notes.",
      });
    });
};

exports.findNote = (req, res) => {
  Note.findById(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).json({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.status(200).json(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.status(500).json({
        message: err.message || "Some error occurred while fetching note.",
      });
    });
};

exports.updateNote = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data not provided provided to update",
    });
  } else {
    const validate = ajv.compile(NoteValidateSchema);
    const noteValid = validate(req.body);
    if (!noteValid) {
      return res.status(400).json(validate.errors[0]);
    }
  }

  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || "Untitled Note",
      content: req.body.content,
      priority: req.body.priority,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).json({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.status(200).json(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message:
            "Couldn't update as note not found with id " + req.params.noteId,
        });
      }
      res.status(500).json({
        message: err.message || "Some error occurred while fetching note.",
      });
    });
};

exports.updateNoteByPatch = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data not provided provided to update",
    });
  } else {
    const validate = ajv.compile(NoteValidateSchema);
    const noteValid = validate(req.body);
    if (!noteValid) {
      return res.status(400).json(validate.errors[0]);
    }
  }

  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || "Untitled Note",
      content: req.body.content,
      priority: req.body.priority,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).json({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.status(200).json(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message:
            "Couldn't update as note not found with id " + req.params.noteId,
        });
      }
      res.status(500).json({
        message: err.message || "Some error occurred while fetching note.",
      });
    });
};

exports.deleteNote = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).json({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.status(200).json({
        message: "Note deleted successfully",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message:
            "Couldn't delete as note not found with id " + req.params.noteId,
        });
      }
      res.status(500).json({
        message: err.message || "Some error occurred while fetching note.",
      });
    });
};
