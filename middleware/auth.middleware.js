const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

// Permet de check si le user a un cookie valide
module.exports.checkUser = (req, res, next) => {
  // On récupère le cookie qui se nomme 'jwt'
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      
      if (err) {
        res.locals.user = null
        res.cookie('jwt', '', { maxAge: 1 })
        next()
      } else {
        let user = await UserModel.findById(decodedToken.userId)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

// Permet de check si le user a un cookie pour etre directement connecté
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err)
        // Pas de next, donc on stop les tests
      } else {
        console.log(decodedToken.userId)
        next()
      }
    })
  } else {
    console.log('No Token')
  }
}