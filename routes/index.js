const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../helpers/errorHandler')
const userController = require('../controllers/userController')
const passport = require('../config/passport')

router.get('/users/:id', userController.getUser)
router.post('/users/signin', passport.authenticate('local', { session: false }), userController.signIn)
// router.post('/user/signup', userController.signup)
// router.post('/user/forgotPassword', userController.forgotPassword)
router.get('/', (req, res) => {
  res.send('hello')
})
router.use('/', apiErrorHandler)

module.exports = router
