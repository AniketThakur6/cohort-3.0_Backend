import mongoose from 'mongoose';

async function connectionToDB(){
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB is Connected success");
}

export default connectionToDB;