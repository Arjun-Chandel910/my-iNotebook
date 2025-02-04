import React, { useContext, useState } from "react";
import Notes from "./Notes";
import NoteContext from "../context/notes/NoteContext";

const Home = () => {
  let state = useContext(NoteContext);
  let { addNote } = state;
  let [note, setNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  let handleInp = (e) => {
    setNote(() => {
      return { ...note, [e.target.name]: e.target.value };
    });
  };
  const handleForm = (e) => {
    e.preventDefault();
    console.log("form");
    addNote(note.title, note.description, note.tag);
  };
  return (
    <div>
      <div className="text-center w-1/2 m-auto overflow-x-auto overflow-y-auto bg-gray-300 border-2 border-solid border-zinc-500 rounded-3xl  ">
        <h1 className="mb-4">Add a Note</h1>
        <form className="" onSubmit={handleForm}>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleInp}
            value={note.title}
            className="bg-white pl-8  border-2 border-solid rounded-3xl  border-blue-500"
          />
          <br />
          <br />
          <input
            type="text"
            name="description"
            value={note.description}
            onChange={handleInp}
            placeholder="description"
            className="bg-white pl-8  border-2 border-solid rounded-3xl  border-blue-500"
          />
          <br />
          <br />
          <input
            type="text"
            name="tag"
            value={note.value}
            onChange={handleInp}
            placeholder="tag"
            className="bg-white pl-8  border-2 border-solid rounded-3xl  border-blue-500"
          />
          <br />
          <br />
          <button className="p-1 m-2 rounded border border-lg bg-green-600 text-white">
            Submit
          </button>
        </form>
      </div>
      <br />
      <br />

      <hr />
      <h1 className="text-center text-4xl mb-4">All Notes</h1>
      <Notes></Notes>
    </div>
  );
};

export default Home;
