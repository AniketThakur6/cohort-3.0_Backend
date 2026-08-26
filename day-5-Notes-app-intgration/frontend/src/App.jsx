import React, { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import axios from "axios";

const App = () => {
  const [noteData, setNoteData] = useState([]);
  const [updateNote, setUpdateNote] = useState(null)

  console.log("app rendering....")

  const getAllNoteData = async () => {
    let res = await axios.get("http://localhost:3000/notes/all-notes");
    setNoteData(res.data.data);
  };

  useEffect(() => {
    getAllNoteData();
  }, []);


  const deleteNote = async (id)=>{
    await axios.delete(`http://localhost:3000/notes/delete-note/${id}`)
    getAllNoteData();
  } 

  return (
    <div className="bg-black text-white px-10 py-20 min-h-screen w-full flex flex-col">
      <NoteForm setUpdateNote={setUpdateNote} updateNote={updateNote} getAllNoteData={getAllNoteData} />
      <div className="grid grid-cols-4 gap-4 p-5">
        {noteData.map((note) => (
          <NoteCard key={note._id}  setUpdateNote={setUpdateNote} deleteNote={deleteNote} note={note} />
        ))}
      </div>
    </div>
  );
};

export default App;
