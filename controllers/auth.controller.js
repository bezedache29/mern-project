const UserModel = require('../models/user.model')
const { signUpErrors, signInErrors } = require('../utils/errors.utils')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 21 * 60 * 60 * 1000 // Equivalent à 3 jours

// FUNCTIONS
const createToken = (userId) => {
  return jwt.sign({userId}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge // Expire après 3 jours
  })
}

// STORE
module.exports.signUp = async (req, res) => {
  // Validate request
  if (!req.body.pseudo) {
    return res.status(400).send({
      message: "User pseudo can not be empty"
    })
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: "User email can not be empty"
    })
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "User password can not be empty"
    })
  }

  const {pseudo, email, password} = req.body

  try {
    const user = await UserModel.create({pseudo, email, password})
    res.status(201).json({ user: user._id })
  }
  catch(e) {
    const errors = signUpErrors(e)
    res.status(200).send({ errors })
    // res.status(200).send({ e })
  }
}

module.exports.signIn = async (req, res) => {

  const {email, password} = req.body

  try {
    const user = await UserModel.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = signInErrors(err)
    res.status(200).send({ errors })
    // res.status(200).send({ err })
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }) // expires dans la milli seconde
  res.redirect('/')
}