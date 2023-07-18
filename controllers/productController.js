const { Product, sequelize } = require('../models')
const { QueryTypes } = require('sequelize')
const productController = {
  getProduct: async (req, res, next) => {
    const productId = Number(req.params.id)
    try {
      const data = await sequelize.query(`SELECT * FROM Products WHERE id = ${productId}`, { type: QueryTypes.SELECT })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  getAllProduct: async (req, res, next) => {
    try {
      const data = await sequelize.query('SELECT * FROM Products', { type: QueryTypes.SELECT })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  addProduct: async (req, res, next) => {
    try {
      const { name, price, description, stock, image, categoryId } = req.body
      const data = await Product.create({
        name, price, description, stock, image, categoryId
      })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { name, price, description, stock, image, categoryId } = req.body
      const productId = req.params.id
      const product = await Product.findOne({
        id: productId
      })
      if (!product) res.status(404).json('Product not found')
      const data = await product.update({
        name, price, description, stock, image, categoryId
      })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!product) res.status(404).json('Product not found')
      // 判斷一下有沒有刪成功？
      await product.destroy()
      res.json('Product deleted')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = productController
