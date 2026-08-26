import React, { useEffect, useState } from "react";
import axios from "axios";

const NoteForm = ({ getAllNoteData, updateNote, setUpdateNote }) => {
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (updateNote) {
      setFormdata(updateNote);
    }
  }, [updateNote]);

  console.log("form render....");

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateNote) {
      let upadate = await axios.put(
        `http://localhost:3000/notes/update-note/${formdata._id}`,
        formdata,
      );

      setUpdateNote(null);
    } else {
      let newNote = await axios.post(
        "http://localhost:3000/notes/create-note",
        formdata,
      );
    }
    // console.log(newNote)

    setFormdata({
      title: "",
      description: "",
    });

    getAllNoteData();
  };

  return (
    <div className="flex w-fit">
      <form
        onSubmit={handleSubmit}
        className="flex text-lg bg-zinc-900 rounded-xl flex-col w-100 gap-4 border-2 py-10 px-5 border-zinc-700"
        action=""
      >
        <h1 className="text-2xl text-center mb-5">
          {updateNote ? "Update Note" : "Add New Task"}
        </h1>
        <input
          onChange={handleChange}
          name="title"
          value={formdata.title}
          className="bg-zinc-800 border border-zinc-700 outline-0 py-2 px-3 rounded-xl"
          type="text"
          placeholder="Title...."
        />
        <input
          onChange={handleChange}
          name="description"
          value={formdata.description}
          className="bg-zinc-800 border border-zinc-700 outline-0 py-2 px-3 rounded-xl"
          type="text"
          placeholder="Description...."
        />
        {updateNote ? (
          <button className="bg-yellow-700 p-2 rounded-lg mt-2">
            Update Note
          </button>
        ) : (
          <button className="bg-blue-700 p-2 rounded-lg mt-2">Add Task</button>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
