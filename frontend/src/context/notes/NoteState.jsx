import React, { useState } from "react"; // Import React for JSX
import NoteContext from "./NoteContext"; // Ensure this is correctly created with createContext()

const NoteState = ({ children }) => {
  const initialNotes = [
    {
      _id: "679e08e5cd5cc22eb8550f02",
      user: "679dae59f4c514d4ab95558e",
      title: "coding",
      description: "do coding (4-6pm)",
      tag: "General",
      date: "2025-02-01T11:43:33.740Z",
      __v: 0,
    },
    {
      _id: "679f8ba7953dbf7f6e105bcc",
      user: "679dae59f4c514d4ab95558e",
      title: "coding",
      description: "do coding (4-6pm)",
      tag: "General",
      date: "2025-02-02T15:13:43.596Z",
      __v: 0,
    },
    {
      _id: "679f8ba8953dbf7f6e105bce",
      user: "679dae59f4c514d4ab95558e",
      title: "coding",
      description: "do coding (4-6pm)",
      tag: "General",
      date: "2025-02-02T15:13:44.359Z",
      __v: 0,
    },
    {
      _id: "679f8ba9953dbf7f6e105bd0",
      user: "679dae59f4c514d4ab95558e",
      title: "coding",
      description: "do coding (4-6pm)",
      tag: "General",
      date: "2025-02-02T15:13:45.099Z",
      __v: 0,
    },
  ];
  let [notes, setNotes] = useState(initialNotes);

  let addNote = (title, description, tag) => {
    console.log("hi");
    let newNote = {
      _id: "679f8ba9953dbf7f6e105bd0",
      user: "679dae59f4c514d4ab95558e",
      title: title,
      description: description,
      tag: tag,
      date: "2025-02-02T15:13:45.099Z",
      __v: 0,
    };
    setNotes(() => {
      return [...notes, newNote];
    });
    //arr.push updates an array , arr.concat returns an array
  };
  let updateNote = () => {};
  let deleteNote = (id) => {
    console.log(id);

    let newNotes = notes.filter((items) => {
      return items._id != id;
    });
    setNotes(newNotes);
  };
  let editNote = (id) => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};

// Correct export syntax for ES Modules
export default NoteState;
