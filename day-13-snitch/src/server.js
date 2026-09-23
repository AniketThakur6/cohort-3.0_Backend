import app from './app/app.js'
import config from './config/config.js'

const port = config.PORT;

app.listen(port,()=>{
  console.log(`server is working at ${port}`);
})