const { Order, OrderProduct, CartProduct, sequelize } = require('../models')
const { QueryTypes } = require('sequelize')
const orderController = {
  addToOrder: async (req, res, next) => {
    const userId = req.user.id
    const transaction = await sequelize.transaction()
    try {
      // 取得購物車中的商品
      const carts = await sequelize.query(
        'SELECT product_id, quantity FROM CartProducts WHERE CartProducts.user_id = :userId',
        {
          replacements: { userId },
          type: QueryTypes.SELECT,
          transaction
        }
      )
      // 遍歷商品，對每個商品做查詢
      for (const cart of carts) {
        const productId = cart.product_id
        const quantity = cart.quantity
        const product = await sequelize.query(
          'SELECT name, stock, total_sold FROM Products WHERE Products.id = :productId',
          {
            replacements: { productId },
            type: QueryTypes.SELECT,
            transaction
          }
        )
        // 驗證是否有不存在的商品 有就不成立訂單
        if (!product || product.length === 0) {
          throw new Error(`Product with ID ${productId} not found`)
        }
        const productInfo = product[0]
        const productName = productInfo.name
        let currentStock = productInfo.stock
        let totalSold = productInfo.total_sold
        // 驗證庫存是否足夠
        if (quantity > currentStock) {
          throw new Error(`product ${productName} is out of stock`)
        }
        // update product stock and total_sold
        currentStock -= quantity
        totalSold += quantity

        // 進行更新
        await sequelize.query(
          'UPDATE Products SET stock = :currentStock, total_sold = :totalSold WHERE Products.id = :productId',
          {
            replacements: {
              currentStock,
              totalSold,
              productId
            },
            type: QueryTypes.UPDATE,
            transaction
          }
        )
      }
      const order = await Order.create({ userId, raw: true, transaction })
      const orderId = order.id
      console.log(carts)
      await OrderProduct.bulkCreate(carts.map(product => ({
        productId: product.product_id,
        quantity: product.quantity,
        orderId
      })), { transaction })
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
      SELECT Orders.id AS order_id, Products.name AS product_name, OrderProducts.quantity, Orders.created_at AS order_date
      FROM Orders
      JOIN OrderProducts ON OrderProducts.order_id = Orders.id
      JOIN Products ON OrderProducts.product_id = Products.id
      WHERE Orders.user_id = :userId
      ORDER BY Orders.created_at DESC
      `, { replacements: { userId }, type: QueryTypes.SELECT })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  deleteOrder: async (req, res, next) => {
    const userId = req.params.id
    const transaction = await sequelize.transaction()
    try {
      await sequelize.query(`
      DELETE FROM Orders 
      WHERE Orders.user_id = :userId
      `, {
        replacements: { userId },
        type: QueryTypes.DELETE,
        transaction
      })
      await transaction.commit()
      res.json('delete success')
    } catch (error) {
      next(error)
      await transaction.rollback()
    }
  }
}
module.exports = orderController
