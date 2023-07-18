'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
  }, {})
  Order.associate = function (models) {
    Order.belongsTo(models.User,
      { foreignKey: 'userId' })
    Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'orderId'
    })
  }
  Order.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    underscored: true
  })
  return Order
}
