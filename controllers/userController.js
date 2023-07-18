const { User, sequelize } = require('../models')
const jwt = require('jsonwebtoken')
const userController = {
  getUser: async (req, res, next) => {
    try {
      const userId = req.params?.id
      console.log(userId)
      const data = await User.findAll()
      if (data.length === 0) return res.status(404).json({ message: 'User not found' })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  signIn: async (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '7d'
      })
      return res.status(200).json({ token, userData })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
