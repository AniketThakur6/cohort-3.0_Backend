import React from "react";

const NoteCard = ({ note,setUpdateNote,deleteNote }) => {
  return (
    <div className="bg-cyan-950 justify-between gap-6 rounded-xl border-2 border-zinc-700 flex flex-col p-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold truncate">{note.title}</h1>
        <h1 className="text-lg flex-wrap wrap-break-word line-clamp-3">{note.description}</h1>
      </div>
      <div className="flex justify-between">
        <button onClick={()=> setUpdateNote(note)} className="py-2 px-4 rounded-xl font-semibold text-xl bg-yellow-600">Update</button>
        <button onClick={()=> deleteNote(note._id)} className="py-2 px-4 rounded-xl font-semibold text-xl bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
