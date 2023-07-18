'use strict'
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
  }, {})
  Cart.associate = function (models) {
    Cart.belongsTo(models.User,
      { foreignKey: 'userId' })
    Cart.belongsToMany(models.Product, {
      through: models.CartProduct,
      foreignKey: 'userId'
    })
  }
  Cart.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts',
    underscored: true
  })
  return Cart
}
