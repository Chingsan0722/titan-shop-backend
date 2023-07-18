const { Cart, CartProduct, sequelize } = require('../models')
const { QueryTypes } = require('sequelize')
const cartController = {
  addToCart: async (req, res, next) => {
    try {
      const userId = req.user.id
      const productId = Number(req.params.id)
      const quantity = Number(req.body.quantity) > 0 ? Number(req.body.quantity) : 0
      if (quantity === 0) res.status(400).json('quantity cannot lower than 1')
      const stock = await sequelize.query('SELECT stock FROM Products WHERE id = :productId', { replacements: { productId }, type: QueryTypes.SELECT })
      if (stock[0].stock < quantity) return res.status(400).json('out of stock')
      await Cart.findOrCreate({ where: { userId } })
      const data = await CartProduct.findOrCreate({
        where: { userId, productId },
        defaults: { quantity }
      })
      if (data[1]) {
        res.json('add success')
      } else {
        const AfterQuantity = data[0].quantity + quantity
        if (stock[0].stock < AfterQuantity) return res.status(400).json('out of stock')
        await CartProduct.update({ quantity: AfterQuantity }, { where: { userId, productId } })
        res.json('add success')
      }
    } catch (error) {
      next(error)
    }
  },
  getCart: async (req, res, next) => {
    const userId = req.user.id
    try {
      const data = await sequelize.query(`
      SELECT
      *
      FROM Cartproducts
      JOIN Products 
      ON Cartproducts.product_id = Products.id
      JOIN Categories
      ON Categories.id = Products.category_id
      WHERE Cartproducts.user_id = :userId`,
      { replacements: { userId }, type: QueryTypes.SELECT })
      data.forEach((cart) => { cart.subTotal = (cart.price * cart.quantity) })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  // add to cart 已經做到可以更新了，先保留
  updateCart: async (req, res, next) => {
    const userId = 1
    const productId = req.params.id
    const quantity = req.body.quantity
    try {
      const product = await CartProduct.findOne({ where: { productId, userId } })
      if (!product) throw new Error('product not found')
      await product.update({ quantity })
      res.json('update success')
    } catch (error) {
      next(error)
    }
  },
  deleteCart: async (req, res, next) => {
    const userId = req.user.id
    const productId = req.params.id
    try {
      const cartProduct = await CartProduct.findOne({ where: { productId, userId } })
      if (!cartProduct) throw new Error('product not found')
      await cartProduct.destroy()
      res.json('delete success')
    } catch (error) {
      next(error)
    }
  },
  deleteAllCart: async (req, res, next) => {
    const userId = req.user.id
    try {
      await CartProduct.destroy({ where: { userId } })
      res.json('delete success')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = cartController
