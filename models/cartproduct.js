'use strict'
module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define('CartProduct', {
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {})
  CartProduct.associate = function (models) {
    CartProduct.belongsTo(models.Cart)
    CartProduct.belongsTo(models.Product)
  }
  return CartProduct
}
