const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/islogged");
const Notes = require("../models/notes");

router.get("/getallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json({ notes });
});

router.post("/addnote", fetchUser, async (req, res) => {
  let userId = req.user.id;
  let { title, description } = req.body;
  let note = new Notes({ user: userId, title, description });
  await note.save();
  res.json({ note });
});

module.exports = router;
