const router = require('express').Router()
const authController = require('../controllers/auth.controller')

// localhost/api/user/register
router.post('/register', authController.signUp)

module.exports = router