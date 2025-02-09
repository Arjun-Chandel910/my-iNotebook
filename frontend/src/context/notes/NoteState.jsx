import React, { useState } from "react"; // Import React for JSX
import NoteContext from "./NoteContext"; // Ensure this is correctly created with createContext()

const NoteState = ({ children }) => {
  let [notes, setNotes] = useState([]);
  let getNote = async () => {
    let token = localStorage.getItem("token");
    console.log("getNote token  : " + token);
    if (!token) {
      return;
    }
    let res = await fetch(`http://localhost:8080/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
    });
    let resData = await res.json();

    setNotes(resData);
  };

  let addNote = async (title, description, tag) => {
    let token = localStorage.getItem("token");

    if (!token) {
      alert("Sign up or Login to add Notes");
      return;
    }

    await fetch(`http://localhost:8080/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    getNote();
  };
  let deleteNote = async (id) => {
    let token = localStorage.getItem("token");

    if (!token) {
      console.log("login first");
      return;
    }
    let res = await fetch(`http://localhost:8080/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
    });
    console.log(res);
    getNote();
  };

  let editNote = async (id, title, description, tag) => {
    let token = localStorage.getItem("token");

    if (!token) {
      console.log("login first");
      return;
    }
    await fetch(`http://localhost:8080/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": token,
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
