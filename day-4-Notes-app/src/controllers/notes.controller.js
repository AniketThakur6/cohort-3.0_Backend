const notesModel = require("../models/notes.model");

const createNotesController = async (req, res) => {
  try {
    let { title, description } = req.body;

    let newNote = await notesModel.create({
      title,
      description,
    });

    console.log("note created successfully");
    return res.status(201).json({
      message: "note created successfully",
      data: newNote,
    });
  } catch (error) {
    res.status(500).json({
      error: error.errors,
      message: "internal server error",
    });
    console.log(`error in creation of notes`, error);
  }
};

const getAllNotesController = async (req, res) => {
  try {
    let allUsers = await notesModel.find();

    return res.status(200).json({
      message: `successfully get all users`,
      data: allUsers,
    });
  } catch (error) {
    console.log(`error in getting users`, error);
    return res.status(500).json({
      errors: error,
      message: "internal server error",
    });
  }
};

const getOneNoteController = async (req, res) => {
  try {
    let { id } = req.params;
    let note = await notesModel.findById(id);

    return res.status(200).json({
      message: `successfully`,
      data: note,
    });
  } catch (error) {
    console.log("error in get-One from db", error);
    return res.status(500).json({
      error: error.errors,
      message: "internal server error",
    });
  }
};

const deleteNoteController = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    let deletedNote = await notesModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Note deleted successfully",
      id,
    });
  } catch (error) {
    console.log(`error in deleting note from db`, error);
    return res.status(500).json({
      error,
      message: "internal server error",
    });
  }
};

const updateNoteController = async (req, res) => {
  try {
    let { id } = req.params;
    let updateNote = await notesModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: `updated successfully`,
      data: updateNote,
    });
  } catch (error) {
    console.log(`error in updating note via put`, error);
    return res.status(500).json({
      message: "internal server error",
      error: error.errors,
    });
  }
};

const updateviaPatchController = async (req,res) => {
  try {
    let { id } = req.params;
    let updateNote = await notesModel.findByIdAndUpdate(id,req.body,{new:true});

    return res.status(200).json({
      message:"updated successfully",
      data: updateNote,
    })
  } catch (error) {
    console.log("error in update via patch",error)
    return res.status(500).json({
      message: "internal server error",
      error: error.errors,
    })
  }
}

module.exports = {
  createNotesController,
  getAllNotesController,
  deleteNoteController,
  getOneNoteController,
  updateNoteController,
  updateviaPatchController,
};
