const { Product, sequelize } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')
const { QueryTypes } = require('sequelize')
const productController = {
  getProduct: async (req, res, next) => {
    const productId = req.params.id
    try {
      const data = await sequelize.query(
      ` SELECT 
        Products.id,
        Products.name,
        Products.price,
        Products.description,
        Products.image,
        Products.stock,
        Products.total_sold AS totalSold,
        Products.available,
        Categories.id AS categoryId,
        Categories.name AS categoryName,
        Categories.available,
        Products.created_at,
        Products.updated_at
        FROM Products
        JOIN Categories ON Products.category_id = Categories.id
        WHERE Products.id = ${productId}`, { type: QueryTypes.SELECT })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  getAllProduct: async (req, res, next) => {
    try {
      const data = await sequelize.query(`
        SELECT 
        Products.id,
        Products.name,
        Products.price,
        Products.description,
        Products.image,
        Products.stock,
        Products.total_sold AS totalSold,
        Products.available,
        Categories.id AS categoryId,
        Categories.name AS categoryName,
        Categories.available,
        Products.created_at,
        Products.updated_at
        FROM Products
        JOIN Categories ON Products.category_id = Categories.id`, { type: QueryTypes.SELECT })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  addProduct: async (req, res, next) => {
    try {
      const { name, price, description, stock, categoryId, available } = req.body
      if (!name || !price || !description || !stock || !categoryId) res.status(400).json('Missing parameters')
      if (Number(stock) <= 0) return res.status(400).json('Stock must be greater than 0')
      if (Number(price) <= 0) return res.status(400).json('Price must be greater than 0')
      let imagePath
      if (req.file) {
        imagePath = await imgurFileHandler(req.file)
      }
      const data = await Product.create({
        name, price, description, stock, image: imagePath, categoryId, available
      })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { name, price, description, stock, categoryId, available } = req.body
      if (name?.length === 0 || description?.length === 0 || categoryId?.length === 0) return res.status(400).json('Missing parameters')
      if (Number(stock) < 0) return res.status(400).json('Stock must be greater than 0')
      if (Number(price) <= 0) return res.status(400).json('Price must be greater than 0')
      let imagePath
      if (req.file) {
        imagePath = await imgurFileHandler(req.file)
      }
      const productId = req.params.id
      const product = await Product.findOne({
        id: productId
      })
      if (!product) return res.status(404).json('Product not found')
      const data = await product.update({
        name, price, description, stock, image: imagePath, categoryId, available
      })
      res.json(data)
    } catch (error) {
      next(error)
    }
  },
  deleteProduct: async (req, res, next) => {
    const id = req.params.id
    try {
      const product = await Product.findByPk(id)
      const inOrder = await sequelize.query(
        'SELECT * FROM OrderProducts WHERE product_id = :id ', { replacements: { id }, type: QueryTypes.SELECT })
      await sequelize.query(
        'DELETE FROM CartProducts WHERE product_id = :id ', { replacements: { id }, type: QueryTypes.DELETE })
      if (inOrder.length > 0) return res.status(400).json('This product is in order, I recommend you to set stock to zero.')
      if (!product) return res.status(404).json('Product not found')
      await product.destroy()
      res.json('Product deleted')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = productController
