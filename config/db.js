const mongoose = require('mongoose')

mongoose
  .connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.vzt8o.mongodb.net/mern-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log('Failed to connect to MongoDB', e))

const db = mongoose.connection

module.exports = db