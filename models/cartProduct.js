module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define('CartProduct', {
    quantity: DataTypes.DECIMAL(10)
  }, {
    sequelize,
    modelName: 'CartProduct',
    tableName: 'CartProducts',
    underscored: true
  })
  return CartProduct
}
