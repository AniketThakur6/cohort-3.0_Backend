const {mongoose} = require('mongoose')

const notesSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    minlength:3
  },
  description : {
    type:String,
    required:true,
    minlength:[20,"Minimun 20 characters is required"],
  }
})

const notesModel = mongoose.model("notes", notesSchema)

module.exports = notesModel;