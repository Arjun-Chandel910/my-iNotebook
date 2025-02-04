import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
NoteItem;
const Notes = () => {
  let state = useContext(NoteContext);
  let { notes, setNotes } = state;
  return (
    <div>
      <div className="flex flex-wrap justify-evenly">
        {notes.map((d) => {
          return <NoteItem props={d} key={d._id}></NoteItem>;
        })}
      </div>
    </div>
  );
};

export default Notes;
