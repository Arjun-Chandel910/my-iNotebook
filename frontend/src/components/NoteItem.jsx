import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import { Trash2, FilePenLine } from "lucide-react";

const NoteItem = ({ note, updateNote }) => {
  let state = useContext(NoteContext);
  let { deleteNote } = state;

  let handleDelete = (id) => {
    deleteNote(id);
  };

  let { title, description, tag, _id } = note; // ✅ Fixed props usage

  return (
    <div className=" mx-8 px-2 border-blue-500 border-1 mb-4 overflow-x-auto rounded-xl bg-zinc-300">
      <h1 className="font-mono text-2xl">{title}</h1>
      <h3 className="font-mono text-sm">{description}</h3>
      <div className="flex flex-row justify-end overflow-x-auto">
        <button
          className="p-1 m-2 rounded border border-lg bg-white text-zinc-600"
          onClick={() => updateNote(note)}
        >
          <FilePenLine />
        </button>

        <button
          onClick={() => handleDelete(_id)}
          className="p-1 m-2 rounded border border-lg bg-white   text-zinc-600"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
