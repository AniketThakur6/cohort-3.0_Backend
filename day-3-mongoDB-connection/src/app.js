const express = require("express");
const connectDb = require('./config/db');
const NotesModel = require("./model/note.model");



const app = express();
app.use(express.json())

connectDb();

app.get("/", (req, res) => {
  console.log("working");
  res.send("hello");
});

app.post("/create",(req,res)=>{
  let {title,description} = req.body;

  const newNote = NotesModel.create({
    title,
    description,
  })

  res.send({
    success: true,
    message:"note created successfully",
    data: newNote,
  })

})


module.exports = app;