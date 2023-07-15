'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: DataTypes.INTEGER
  }, {})
  Order.associate = function (models) {
    Order.belongsTo(models.User,
      { foreignKey: 'user_id' })
    Order.belongsToMany(models.Product,
      { through: 'OrderProduct', foreignKey: 'order_id' })
  }
  return Order
}
