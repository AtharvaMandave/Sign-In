const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()
const express  = require('express');
const cors = require('cors');
const app = express()
const userRoutes = require('./routes/user.routes')

const connectdb = require('./db/db')
connectdb()
app.use(cookieParser())
app.use(cors())
app.get('/',(req,res) =>{
    res.send("hello world")
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/users',userRoutes )
module.exports =app