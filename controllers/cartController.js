const { Cart, CartProduct, sequelize } = require('../models')
const { QueryTypes } = require('sequelize')
const cartController = {
  addToCart: async (req, res, next) => {
    try {
      const userId = 1
      const productId = Number(req.params.id)
      const quantity = Number(req.body.quantity)
      const cart = await Cart.findOrCreate({ where: { userId }, raw: true })
      const cartId = cart[0].id
      console.log('cartid', cartId)
      console.log('productId', productId)
      console.log('quantity', quantity)
      const data = await CartProduct.findOrCreate({
        where: { userId, productId },
        defaults: { quantity }
      })
      if (data[1]) {
        res.json('add success')
      } else {
        res.json('your cart already exist this product.')
      }
    } catch (error) {
      next(error)
    }
  },
  getCart: async (req, res, next) => {
    const userId = req.params.id
    try {
      const data = await sequelize.query(`
      SELECT
      *
      FROM Carts 
      JOIN Cartproducts 
      ON Carts.id = Cartproducts.cart_id 
      JOIN Products 
      ON Cartproducts.product_id = Products.id
      JOIN Categories
      ON Categories.id = Products.category_id
      WHERE Carts.user_id = :userId`,
      { replacements: { userId }, type: QueryTypes.SELECT })
      data.forEach((cart) => { cart.subTotal = (cart.price * cart.quantity) })
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
      const product = await CartProduct.findOne({ where: { productId, userId } })
      if (!product) throw new Error('product not found')
      await product.update({ quantity })
      res.json('update success')
    } catch (error) {
      next(error)
    }
  },
  deleteCart: async (req, res, next) => {
    const userId = 1
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
    const userId = req.params.id
    await sequelize.transaction(async (t) => {
      await CartProduct.destroy({ where: { userId }, transaction: t })
    })
    res.json('delete success')
  }
}

module.exports = cartController
