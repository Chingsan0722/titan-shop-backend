const express = require('express')
const router = express.Router()
// const { apiErrorHandler } = require('../middleware/errorHandler')
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
// 先做只有管理員能看的，等優化再加入會員查訂單
router.get('/orders/users/:id', authenticatedAdmin, orderController.getOrder)
router.delete('/orders/users/:id', authenticatedAdmin, orderController.deleteOrder)

// Users
// 測試用。還沒寫好前端讓使用者編輯資料，確定要加註冊再補
router.get('/users/:id', userController.getUser)

router.post('/users/signin', passport.authenticate('local', { session: false }), userController.signIn)
// router.post('/user/signup', userController.signup)
// router.post('/user/forgotPassword', userController.forgotPassword)
// 可以寫 API 文件放在這條上面（有空再說）
router.get('/', (req, res) => {
  res.send('Welcome to the Titan Shop API')
})
// router.use('/', apiErrorHandler)

module.exports = router
