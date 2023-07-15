const { Product } = require('../models')
const productController = {
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
  }
}

module.exports = productController
