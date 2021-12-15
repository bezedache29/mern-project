const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      unique: true,
      trim: true // Permet de supprimer les espaces
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      max: 1024, // Taille après avoir été hash
      minlength: 6
    },
    picture: {
      type: String,
      default: './uploads/profil/random-user.png',
    },
    bio: {
      type: String,
      max: 1024
    }
  },
  {
    timestamps: true
  }
)

// Fonction avant de save dans la DB
// Avant de save en DB, on hash le pwd
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Permet de check le pwd du user avec celui hash en DB lors du login
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }

    throw Error('incorrect password')
  }

  throw Error('incorrect email')
}

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel