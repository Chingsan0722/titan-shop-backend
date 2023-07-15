'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
  }, {})
  Order.associate = function (models) {
    Order.hasMany(models.User,
      { foreignKey: 'userId' })
    Order.hasMany(models.Product,
      { foreignKey: 'productId' })
  }
  Order.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    underscored: true
  })
  return Order
}
