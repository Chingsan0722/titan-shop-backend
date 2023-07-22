const { User } = require('../models')
const jwt = require('jsonwebtoken')
const userController = {
  getUser: async (req, res, next) => {
    try {
      const userId = req.params?.id
      const data = await User.findOne({ where: { id: userId }, raw: true })
      // 下一版新增cart的資料，讓使用者再次登入時可以知道他已經放了什麼在cart中
      if (data.length === 0) return res.status(404).json({ message: 'User not found' })
      delete data.password
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  signIn: async (req, res, next) => {
    try {
      const data = req.user.toJSON()
      delete data.password
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '7d'
      })
      return res.status(200).json({ token, data })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
