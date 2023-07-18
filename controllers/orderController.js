const { Order, OrderProduct, Cart, CartProduct, sequelize } = require('../models')
const { QueryTypes } = require('sequelize')
const orderController = {
  addToOrder: async (req, res, next) => {
    const userId = 1
    const transaction = await sequelize.transaction()
    try {
      const carts = await CartProduct.findAll({ where: { userId }, raw: true, transaction })
      const order = await Order.create({ userId, transaction, raw: true })
      const orderId = order.id
      await OrderProduct.bulkCreate(carts.map(product => ({
        productId: product.productId,
        quantity: product.quantity,
        orderId
      })), { transaction })
      await Cart.destroy({ where: { userId }, transaction })
      await CartProduct.destroy({ where: { userId }, transaction })
      await transaction.commit()
      res.json('post success')
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  },
  getOrder: async (req, res, next) => {
    const userId = req.params.id
    try {
      const data = await sequelize.query(`
      SELECT * FROM OrderProducts 
      JOIN Products ON OrderProducts.product_id = Products.id
      JOIN Orders ON OrderProducts.order_id = Orders.id
      WHERE Orders.user_id = :userId `, { replacements: { userId }, type: QueryTypes.SELECT })
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = orderController
