// const UserModel = require('../models/user.model')

// module.exports.signUp = async (req, res) => {
//   console.log(req.body)
//   const {pseudo, email, password} = req.body

//   try {
//     const user = await UserModel.create({pseudo, email, password})
//     res.status(201).json({ user: user._id })
//   }
//   catch(e) {
//     res.status(200).send({ e })
//   }
// }

const UserModel = require('../models/user.model')

exports.create = (req, res) => {
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

  // Create User document
  const user = new UserModel({
    pseudo : req.body.pseudo,
    email: req.body.email,
    password: req.body.password
  })

  // Save data
  user.save()
  .then(user => {
    res.send(user)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured while creating user"
    })
  })
}