const express = require('express')
const notesRouter = require('./router/notes.route')
const connectDB = require('./config/connectionDB')
const cors = require('cors')


const app = express()
connectDB();

app.use(express.json());

app.use(cors({
  origin:"http://localhost:5173"
}));

// app.get('/',(req,res)=>{
//   console.log(`response successs`)
//   res.send("server is working")
// })

app.use("/notes", notesRouter)

module.exports = app