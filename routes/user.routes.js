const router = require('express').Router()
// const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

// Auth
// localhost/api/users/register
router.post('/register', userController.create)

// user DB
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router

// module.exports = (app) => {
//   // require controller
//   const controller = require('../controllers/user.controller')

//   app.get('/users', controller.getAllUsers)
//   app.get('/users/:id', controller.getUser)
//   app.post('/users/register', controller.create)
//   app.put('/users/:id', controller.update)
// }