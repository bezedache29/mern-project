const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
require('dotenv').config({path: './config/.env'})
require('./config/db')

const {checkUser, requireAuth} = require('./middleware/auth.middleware')

const app = express()
// const db = require('./config/db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// db.on('error', console.error.bind(console, 'MongoDB connection Error'))
// db.on('open', function () {
//   console.log('MongoDB connected successfully')
// })

// Middlewares
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})



// Routes
app.use('/api/users', userRoutes)
// require('./routes/user.routes')(app)

// Server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`)
})