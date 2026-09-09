import app from "./app/app.js";
import dotenv from "dotenv";
import connectionToDB from './config/db.js'

dotenv.config();

await connectionToDB();

const port  = process.env.PORT || 4000;

app.listen(port,()=>{
  console.log(`server is running at ${port}`);
})