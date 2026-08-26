const mongoose = require('mongoose')

const connectDB = async()=>{
  try {
    
    await mongoose.connect(process.env.mongodb_uri)

  } catch (error) {
    console.log(`error in connecting to DB `, error)
    return 
  }

  console.log("mongoDB connected successfully")
}

module.exports = connectDB ;