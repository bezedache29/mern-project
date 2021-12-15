const UserModel = require('../models/user.model')
const FollowModel = require('../models/follow.model')

// Va servir pour controler que les ids de la DB sont connu
const ObjectID = require('mongoose').Types.ObjectId


// INDEX
module.exports.getAllUsers = async (req, res) => {
  // -password dans le select(), veut dire qu'on ne veut pas récupérer le password dans le resultat
  const users = await UserModel.find().select('-password')

  if (!users) {
    return res.status(500).send({
      message: err.message
    })
  }

  res.status(200).json(users)
}


// SHOW
module.exports.getUser = async (req, res) => {
  // On check que l'id en paramètre existe en DB
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id)
  }

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      console.log('ID unknown : ' + err)
    }
  }).select('-password')
}

// STORE
module.exports.create = async (req, res) => {
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


// UPDATE
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id)
  }

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      {bio : req.body.bio},
      {new: true, upsert: true, setDefaultsOnInsert: true}
    )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id : " + req.params.id
        })
      }

      res.send(user)
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error updating user with id " + req.params.id
      })
    })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}


// DELETE
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id)
  }

  try {
    UserModel.findByIdAndDelete(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id : " + req.params.id
          })
        }

        return res.send({message : "User deleted successfully ... !"})
      })
      .catch(err => {
        return res.status(500).send({
          message: "Error deleting user with id " + req.params.id
        })
      })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}


// FOLLOW
module.exports.follow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id)
  }

  const idToFollow = req.body.idToFollow
  const idIsFollowing = req.params.id

  try {
    await FollowModel.create({
      idToFollow: idToFollow,
      idIsFollowing: idIsFollowing
    })
    res.status(200).send({
      message: 'Follow OK'
    })
  }
  catch(e) {
    res.status(500).send({ e })
  }
}

// UNFOLLOW
module.exports.unfollow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID unknown : ' + req.params.id)
  }

  const idToFollow = req.body.idToFollow
  const idIsFollowing = req.params.id

  try {
    FollowModel.findOneAndDelete({
      idToFollow: idToFollow,
      idIsFollowing: idIsFollowing,
    }, (err, docs) => {
      if (!err) {
        res.status(200).send({
          message: 'Unfollow OK'
        })
      } else {
        console.log(err)
      }
    })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}