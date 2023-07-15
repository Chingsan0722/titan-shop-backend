'use strict'
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
  }, {})
  Cart.associate = function (models) {
    Cart.hasMany(models.User,
      { foreignKey: 'userId' })
    Cart.hasMany(models.Product,
      { foreignKey: 'productId' })
  }
  Cart.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts',
    underscored: true
  })
  return Cart
}
