const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../helpers/errorHandler')
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const orderController = require('../controllers/orderController')
const passport = require('../config/passport')

router.get('/products/all', productController.getAllProduct)
router.get('/products/:id', productController.getProduct)
router.put('/products/:id', productController.updateProduct)
router.delete('/products/:id', productController.deleteProduct)
router.post('/products', productController.addProduct)

router.post('/carts/products/:id', cartController.addToCart)
router.put('/carts/products/:id', cartController.updateCart)
router.delete('/carts/products/:id', cartController.deleteCart)
router.delete('/carts/users/:id', cartController.deleteAllCart)
router.get('/carts/users/:id', cartController.getCart)

router.post('/orders', orderController.addToOrder)
router.get('/orders/users/:id', orderController.getOrder)

router.get('/users/:id', userController.getUser)
router.post('/users/signin', passport.authenticate('local', { session: false }), userController.signIn)
// router.post('/user/signup', userController.signup)
// router.post('/user/forgotPassword', userController.forgotPassword)
router.get('/', (req, res) => {
  res.send('hello')
})
router.use('/', apiErrorHandler)

module.exports = router
