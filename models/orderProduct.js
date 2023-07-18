module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'OrderProduct',
    tableName: 'OrderProducts',
    underscored: true
  })
  return OrderProduct
}
