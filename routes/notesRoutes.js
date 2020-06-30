const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Note = mongoose.model("Note");

// request route is /api/v1
router.get("/notes", async (req, res) => {
  const notes = await Note.find({ _user: req.user.id });

  res.json(notes);
});

router.post("/notes", async (req, res) => {
  const { text } = req.body;
  const note = new Note({
    text: text,
    dateCreated: new Date(),
    _user: req.user.id,
  });

  const savedNote = await note.save();

  res.json(savedNote);
});

router.delete("/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

module.exports = router;
