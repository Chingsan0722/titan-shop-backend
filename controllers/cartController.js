const { Cart } = require('../models')
const cartController = {
  addToCart: async (req, res, next) => {
    try {
      const userId = 1
      const productId = req.params.id
      const quantity = req.body.quantity
      const data = await Cart.create({ productId, userId, quantity })
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = cartController
