const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
require('dotenv').config({path: './config/.env'})
require('./config/db')
const app = express()
const db = require('./config/db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

db.on('error', console.error.bind(console, 'MongoDB connection Error'))
db.on('open', function () {
  console.log('MongoDB connected successfully')
})

// Middlewares

// Routes
app.use('/api/users', userRoutes)
// require('./routes/user.routes')(app)

// Server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`)
})