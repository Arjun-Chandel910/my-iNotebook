import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const Notes = () => {
  let state = useContext(NoteContext);
  let { notes, getNote, editNote } = state;

  useEffect(() => {
    getNote();
  }, []); // ✅ Added getNote as a dependency

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  let [currNote, setCurrNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "",
  });
  let handleInp = (e) => {
    console.log("inp");
    setNote((d) => {
      return { ...d, [e.target.name]: e.target.value };
    });
  };
  let updateNote = (note) => {
    setCurrNote(note);
    handleOpen();
  };
  let handleEdit = async (e) => {
    // UPDATING THE DATA EXCEPT IT
    e.preventDefault();
    currNote.title = note.title;
    currNote.description = note.description;
    currNote.tag = note.tag;
    //EDIT NOTE
    await editNote(
      currNote._id,
      currNote.title,
      currNote.description,
      currNote.tag
    );

    // reset input
    setNote({
      title: "",
      description: "",
      tag: "",
    });

    //reset input
    setCurrNote({
      _id: "",
      title: "",
      description: "",
      tag: "",
    });

    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center">
          <form action="" onSubmit={handleEdit}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              required
              onChange={handleInp}
              name="title"
              value={note.title}
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              required
              onChange={handleInp}
              name="description"
              value={note.description}
            />
            <br />
            <br />
            <TextField
              value={note.tag}
              id="outlined-basic"
              label="Tag"
              variant="outlined"
              required
              onChange={handleInp}
              name="tag"
            />
            <br />
            <br />
            <div className="text-center">
              <Button type="submit" variant="contained">
                Edit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      <div className="flex flex-wrap justify-evenly">
        {notes.map((d) => (
          <NoteItem note={d} key={d._id} updateNote={updateNote} /> // ✅ Corrected prop passing
        ))}
      </div>
    </div>
  );
};

export default Notes;
