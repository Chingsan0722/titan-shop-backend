'use strict'
module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define('CartProduct', {
  }, {})
  CartProduct.associate = function (models) {
    CartProduct.belongsTo(models.Cart)
    CartProduct.belongsTo(models.Product)
  }
  CartProduct.init({
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartProduct',
    tableName: 'CartProducts',
    underscored: true
  })
  return CartProduct
}
