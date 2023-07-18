const { Order, Cart, sequelize } = require('../models')
const orderController = {
  addToOrder: async (req, res, next) => {
    const userId = 1
    const transaction = await sequelize.transaction()
    try {
      const data = await Cart.findAll({ where: { userId }, raw: true, transaction })
      await Order.bulkCreate(data, { transaction })
      await Cart.destroy({ where: { userId }, transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
    res.json('post success')
  },
  getOrder: async (req, res, next) => {
    try {
      const data = await Order.findAll()
      res.json(data)
    } catch (error) {
      next(error)
    }
    res.json('post success')
  }
}

module.exports = orderController
