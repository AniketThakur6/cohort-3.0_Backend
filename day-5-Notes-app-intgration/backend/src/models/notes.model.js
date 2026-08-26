const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    minLength: 3,
  },
  description : {
    type: String,
    required:true,
    minLength: [20, `Minimum length of 20 characters`]
  }
})

const NotesModel = mongoose.model("notes", notesSchema)

module.exports = NotesModel;