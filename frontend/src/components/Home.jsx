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
    setNote((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });
  };
  const handleForm = (e) => {
    e.preventDefault();

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
            required
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
            required
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
            required
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

      <hr className="text-rose-500" />
      <h1 className="text-center text-4xl mb-4 text-blue-500">All Notes</h1>
      <Notes></Notes>
    </div>
  );
};

export default Home;
