const NotesModel = require("../models/notes.model");

const createNoteController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = await NotesModel.create({ title, description });
    console.log("newNote successfully created");
    return res.status(201).json({
      message: "newNote successfully created",
      data: req.body,
    });
  } catch (error) {
    console.log("error in newNote creation ", error);
    return res.status(500).json({
      message: "internal srever error",
      error: error.errors,
    });
  }
};

const getAllNotesController = async (req, res) => {
  try {
    const allNotes = await NotesModel.find();
    console.log(`successfully to get all note from db`);
    return res.status(200).json({
      message: `successfully to get all note from db`,
      data: allNotes,
    });
  } catch (error) {
    console.log(`error in getting note from db`, error);
    return res.status(500).json({
      message: `internal server error`,
      error: error.errors,
    });
  }
};

const getOneNoteController = async (req, res) => {
  try {
    let { id } = req.params;
    const oneNote = await NotesModel.findById(id, req.body, {
      returnDocument: "after",
    });

    console.log("getting one note successfully")
    return res.status(200).json({
      message:"getting one note successfully",
      data:oneNote,
    })

  } catch (error) {
    console.log("error in getting one note ",error);
    return res.status(500).json({
      message: "internal server error",
      error:error.errors,
    })
  }
};

const deleteNoteController = async (req, res) => {
  try {
    let { id } = req.params;
    const deleteNote = await NotesModel.findByIdAndDelete(id);
    console.log("noted deleted successfully");
    return res.status(200).json({
      message: "noted deleted successfully",
      id,
    });
  } catch (error) {
    console.log(`error in deleting note from db`, error);
    return res.status(500).json({
      message: `internal server error`,
      error: error.errors,
    });
  }
};

const updateNoteController = async (req, res) => {
  try {
    const { id } = req.params;
    updateNote = await NotesModel.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    console.log("note update successfully via put");
    return res.status(200).json({
      message: "note update successfully via put",
      data: updateNote,
    });
  } catch (error) {
    console.log("error in updatinmg note from db via put", error);
    return (
      res.status(500),
      json({
        massage: "internal server error",
        error: error.errors,
      })
    );
  }
};

const patchNoteController = async (req, res) => {
  try {
    let { id } = req.params;
    let updatedNote = await NotesModel.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    console.log("update note is successfull via patch");
    return res.status(200).json({
      message: "update note is successfull via patch",
      data: updatedNote,
    });
  } catch (error) {
    console.log("error in updated note via patch", error);
    return res.status(500).json({
      message: "internal server error",
      error: error.errors,
    });
  }
};

module.exports = {
  createNoteController,
  getAllNotesController,
  getOneNoteController,
  deleteNoteController,
  updateNoteController,
  patchNoteController,
};
