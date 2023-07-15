const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../helpers/errorHandler')
const userController = require('../controllers/userController')
// const passport = require('../config/passport')

router.get('/user/:id', userController.getUser)
router.get('/', (req, res) => {
  res.send('hello')
})
router.use('/', apiErrorHandler)

module.exports = router
