require('dotenv').config()
const app = require('./src/app')

const port = process.env.port || 4000 ;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
