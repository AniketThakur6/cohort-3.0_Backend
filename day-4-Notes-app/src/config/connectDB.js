const { mongoose } = require('mongoose')

const connectDB =async()=>{
  try {
    await mongoose.connect("mongodb://localhost:27017/notes-app")
  } catch (error) {
      console.log("db connection error",errors)
  }

  console.log(`mongodb connected`)
}

module.exports = connectDB ;