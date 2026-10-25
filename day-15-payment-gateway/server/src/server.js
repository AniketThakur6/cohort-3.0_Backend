import app from './app/app.js'
import connectToDB from './config/db.js'
import config from "./config/config.js"

await connectToDB();

const port = config.PORT;

app.listen(port,()=>{
  console.log(`server is running at ${port}`);
});