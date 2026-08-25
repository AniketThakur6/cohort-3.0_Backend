
const notesModel = require("../models/notes.model")

const createNotesController = async (req, res) => {
  try {
    let { title, description } = req.body;

    let newNote = await notesModel   .create({
      title,
      description,
    });

    console.log("note created successfully");
    return res.status(201).json({
      message: "note created successfully",
      data: newNote,
    });
  } catch (error) {
    console.log(`error in creation of notes`, error);
  }
}

module.exports = createNotesController;