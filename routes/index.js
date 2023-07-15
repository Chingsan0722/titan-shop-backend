const express = require('express')
const router = express.Router()
// const passport = require('../config/passport')

router.get('/', (req, res) => {
  res.send('hello')
})
