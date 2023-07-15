'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
  }, {})
  OrderProduct.associate = function (models) {
    OrderProduct.belongsTo(models.Cart)
    OrderProduct.belongsTo(models.Product)
  }
  OrderProduct.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderProduct',
    tableName: 'OrderProducts',
    underscored: true
  })
  return OrderProduct
}
