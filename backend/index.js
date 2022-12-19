const connectToMongo = require('./db.js')
const express=require('express')
connectToMongo;
const app=express()
var cors = require('cors')
app.use(cors())
const port=5000
app.use(express.json())
//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/',(req,res) => {
    res.send('Hello User')
})
// app.get('/api/auth',(req,res) => {
//     res.send('you are in api')
// })
// app.get('/api/notes',(req,res) => {
//     res.send('you are in api')
// })
//to use req body setup middleware  app.use(express.json())
app.listen(port,() => {
    console.log("inotebook app listening at port 5000")
})
