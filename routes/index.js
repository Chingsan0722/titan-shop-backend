const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../middleware/errorHandler')
const { authenticated, authenticatedAdmin } = require('../middleware/api-auth')
const upload = require('../middleware/multer')
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const orderController = require('../controllers/orderController')
const passport = require('../config/passport')

// Products
router.get('/products', productController.getAllProduct)
router.get('/products/:id', productController.getProduct)
router.put('/products/:id',
  upload.single('image'), authenticatedAdmin, productController.updateProduct)
router.delete('/products/:id', authenticatedAdmin, productController.deleteProduct)
router.post('/products',
  upload.single('image'), authenticatedAdmin, productController.addProduct)

// Carts
router.post('/carts/products/:id', authenticated, cartController.addToCart)
router.put('/carts/products/:id', authenticated, cartController.updateCart)
router.delete('/carts/products/:id', authenticated, cartController.deleteCart)
router.delete('/carts/all', authenticated, cartController.deleteAllCart)
router.get('/carts', authenticated, cartController.getCart)

// Orders
router.post('/orders', authenticated, orderController.addToOrder)
router.get('/orders/:id', authenticated, orderController.getOrder)
router.delete('/orders/users/:id', authenticatedAdmin, orderController.deleteOrder)

// Users
router.get('/users/:id', userController.getUser)

router.post('/users/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.get('/', (req, res) => {
  res.send('Welcome to the Titan Shop API')
})
router.use('/', apiErrorHandler)

module.exports = router
