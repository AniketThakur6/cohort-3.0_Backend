const express = require("express");
const {
  createNotesController,
  getAllNotesController,
  deleteNoteController,
  getOneNoteController,
  updateNoteController,
  updateviaPatchController,
} = require("../controllers/notes.controller");

const router = express.Router();

// create note in db
router.post("/create-note", createNotesController);

// get all notes in db
router.get("/all-notes", getAllNotesController);

// get one note from db
router.get("/one-note/:id", getOneNoteController);

//delete a note from db
router.delete("/delete-note/:id", deleteNoteController);

//update via put 
router.put("/update-note/:id", updateNoteController)

//update via patch
router.patch('/patch-note/:id',updateviaPatchController)

module.exports = router;
