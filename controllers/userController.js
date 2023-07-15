const { User } = require('../models')
const userController = {
  getUser: async (req, res, next) => {
    try {
      const userId = req.params?.id
      const data = await User.findAll({ where: { id: userId } })
      if (data.length === 0) return res.status(404).json({ message: 'User not found' })
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
