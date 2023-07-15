'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {})
  OrderProduct.associate = function (models) {
    OrderProduct.belongsTo(models.Cart)
    OrderProduct.belongsTo(models.Product)
  }
  return OrderProduct
}
