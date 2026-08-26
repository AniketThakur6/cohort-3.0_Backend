const express = require("express");
const connectDB = require("./config/connectDB");
const notesRouter = require("./routes/notes.route")

const app = express();

app.use(express.json());

connectDB();

app.use('/notes', notesRouter )

module.exports = app;
