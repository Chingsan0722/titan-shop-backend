module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    quantity: DataTypes.DECIMAL(10)
  }, {
    sequelize,
    modelName: 'OrderProduct',
    tableName: 'OrderProducts',
    underscored: true
  })
  return OrderProduct
}
