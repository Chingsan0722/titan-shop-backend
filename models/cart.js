'use strict'
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    user_id: DataTypes.INTEGER
  }, {})
  Cart.associate = function (models) {
    Cart.belongsTo(models.User,
      { foreignKey: 'user_id' })
    Cart.belongsToMany(models.Product,
      { through: 'CartProducts', foreignKey: 'cart_id' })
  }
  return Cart
}
