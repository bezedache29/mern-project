const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
require('dotenv').config({path: './config/.env'})
require('./config/db')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Middlewares

// Routes
app.use('/api/users', userRoutes)

// Server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`)
})