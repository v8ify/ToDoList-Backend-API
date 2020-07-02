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

router.delete("/notes/:taskId", async (req, res) => {
  try {
    const note = await Note.findById(req.params.taskId);
    await note.remove();
    res.json(note);
  } catch (err) {
    res.json({ success: false });
  }
});

router.patch("/notes/:taskId", async (req, res) => {
  console.log(req.body);
  try {
    let note = await Note.findByIdAndUpdate(req.params.taskId, req.body, {
      new: true,
    });
    res.json(note);
  } catch (err) {
    res.json({ success: false });
  }
});

module.exports = router;
