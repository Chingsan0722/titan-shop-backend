'use strict'
module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define('CartProduct', {
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {})
  CartProduct.associate = function (models) {
    // associations can be defined here
  }
  return CartProduct
}
