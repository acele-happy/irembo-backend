const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const teacherRoutes = require('./routes/userRoutes')
const cors = require('cors')
const {corsFunction} = require('./utils/cors')
const {text} = require('./controllers/urlController')

require('dotenv').config() 
require('./models/dbConnect') 

app.use(cors())
app.use(corsFunction)
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.get('/hello',text)
// app.use(teacherRoutes)

app.listen(process.env.PORT,()=>console.log('Connected to port 4040'))