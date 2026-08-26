const { mongoose } = require('mongoose')

const connectDB =async()=>{
  try {
    await mongoose.connect(process.env.mongodb_uri )
  } catch (error) {
    return  console.log("db connection error",error)
  }

  console.log(`mongodb connected`)
}

module.exports = connectDB ;