const express = require("express");
const connectDB = require("./config/connectDB");
const notesModel = require("./models/notes.model");
const createNotesController = require("./controllers/notes.controller");

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  console.log("get api");
  res.send("succesful");
});

app.post("/create", createNotesController);

module.exports = app;
