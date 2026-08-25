const { mongoose } = require("mongoose")

const connectDb = async () => {
  try {
   await mongoose.connect(
      "",
    );
  } catch (error) {
    console.log(" connectionDb error", error);
  }

  console.log("mongoDb connected")

};


module.exports = connectDb ;