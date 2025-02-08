import React, { useState } from "react"; // Import React for JSX
import NoteContext from "./NoteContext"; // Ensure this is correctly created with createContext()

const NoteState = ({ children }) => {
  let [notes, setNotes] = useState([]);
  let getNote = async () => {
    let response = await fetch(`http://localhost:8080/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5ZGFlNTlmNGM1MTRkNGFiOTU1NThlIn0sImlhdCI6MTczODQwMzk1M30.CcSMhX_f73RAynTX8ZYCuRK4OiAJGyvT5oUBxrnMvQ0",
      },
    });
    let res = await response.json();

    setNotes(res);
  };

  let addNote = async (title, description, tag) => {
    await fetch(`http://localhost:8080/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5ZGFlNTlmNGM1MTRkNGFiOTU1NThlIn0sImlhdCI6MTczODQwMzk1M30.CcSMhX_f73RAynTX8ZYCuRK4OiAJGyvT5oUBxrnMvQ0",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    getNote();
  };
  let deleteNote = async (id) => {
    let res = await fetch(`http://localhost:8080/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5ZGFlNTlmNGM1MTRkNGFiOTU1NThlIn0sImlhdCI6MTczODQwMzk1M30.CcSMhX_f73RAynTX8ZYCuRK4OiAJGyvT5oUBxrnMvQ0",
      },
    });
    console.log(res);
    getNote();
  };

  let editNote = async (id, title, description, tag) => {
    await fetch(`http://localhost:8080/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5ZGFlNTlmNGM1MTRkNGFiOTU1NThlIn0sImlhdCI6MTczODQwMzk1M30.CcSMhX_f73RAynTX8ZYCuRK4OiAJGyvT5oUBxrnMvQ0",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log("hi");
    getNote();
  };

  //   notes.map((d) => {
  //     if (d._id == id) {
  //       d.title = title;
  //       d.description = description;
  //       d.tag = tag;
  //     }
  //   });
  // };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, getNote, deleteNote, editNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

// Correct export syntax for ES Modules
export default NoteState;
