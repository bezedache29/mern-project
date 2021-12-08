const mongoose = require('mongoose')
const { isEmail } = require('validator')

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
    bio: {
      type: String,
      max: 1024
    },
    followers: {
      type: [String] // C'est un tableau qui contient des strings
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
)

const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel