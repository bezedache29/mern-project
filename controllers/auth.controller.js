const UserModel = require('../models/user.model')

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
    res.status(200).send({ e })
  }
}