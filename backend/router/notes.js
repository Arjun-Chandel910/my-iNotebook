const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/islogged");
const Notes = require("../models/notes");
const User = require("../models/user");

router.get("/getallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

router.post("/addnote", fetchUser, async (req, res) => {
  let userId = req.user.id;
  let checkUser = await User.findById(userId);
  if (!checkUser) {
    res.status(400).json({ success: "false", message: "user not valid" });
  } else {
    let { title, description } = req.body;
    let note = new Notes({ user: userId, title, description });
    await note.save();
    res.json({ note });
  }
});

//update a note
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description, tag } = req.body;

    let note = await Notes.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (req.user.id != note.user.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to update this." });
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      id,
      { title, description, tag },
      { new: true }
    );

    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ error: "Some error occurred" });
  }
});

//delete a note
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    let { id } = req.params;
    let note = await Notes.findById(id);
    if (req.user.id != note.user.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to update this." });
    }

    const deletedNote = await Notes.findByIdAndDelete(id);

    res.json({ deletedNote, message: "note deleted" });
  } catch (err) {
    res.status(400).json("Some error orrucred");
  }
});
module.exports = router;
