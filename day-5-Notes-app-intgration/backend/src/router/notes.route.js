const express = require("express");
const router = express.Router();
const {
  createNoteController,
  getAllNotesController,
  getOneNoteController,
  deleteNoteController,
  updateNoteController,
  patchNoteController,
} = require("../controller/notes.controller");

//create note
router.post("/create-note", createNoteController);

// get all notes
router.get("/all-notes", getAllNotesController);

//get note
router.get("/one-note/:id" ,getOneNoteController);

//delete note
router.delete("/delete-note/:id", deleteNoteController)

//update note via put
router.put('/update-note/:id',updateNoteController)

//update note via patch
router.patch("/patch-note/:id", patchNoteController)

module.exports = router;
