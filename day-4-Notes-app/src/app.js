const express = require('express')
const notesRouter = require('./router/notes.route')
const connectDB = require('./config/connectionDB')
const app = express()

connectDB();

app.use(express.json());

// app.get('/',(req,res)=>{
//   console.log(`response successs`)
//   res.send("server is working")
// })

app.use("/notes", notesRouter)

module.exports = app