const { Cart, sequelize } = require('../models')
const { QueryTypes } = require('sequelize')
const cartController = {
  addToCart: async (req, res, next) => {
    try {
      const userId = 1
      const productId = Number(req.params.id)
      const quantity = Number(req.body.quantity)
      const data = await Cart.create({ productId, userId, quantity })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  getCart: async (req, res, next) => {
    const userId = req.params.id
    try {
      const data = await sequelize.query('SELECT * FROM carts JOIN products ON carts.product_id = products.id WHERE carts.user_id = :userId',
        { replacements: { userId }, type: QueryTypes.SELECT })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  updateCart: async (req, res, next) => {
    const userId = 1
    const productId = req.params.id
    const quantity = req.body.quantity
    try {
      const cart = await Cart.findOne({ where: { productId, userId } })
      if (!cart) throw new Error('product not found')
      await cart.update({ quantity })
      res.json('update success')
    } catch (error) {
      next(error)
    }
  },
  deleteCart: async (req, res, next) => {
    const userId = 1
    const productId = req.params.id
    try {
      const cart = await Cart.findOne({ where: { productId, userId } })
      if (!cart) throw new Error('cart not found')
      await cart.destroy()
      res.json('delete success')
    } catch (error) {
      next(error)
    }
  },
  deleteAllCart: async (req, res, next) => {
    const userId = req.params.id
    const carts = await Cart.findAll({ where: { userId }, raw: true })
    carts.destroy()
    res.json('delete success')
  }
}

module.exports = cartController
