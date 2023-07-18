module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define('CartProduct', {
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
    modelName: 'CartProduct',
    tableName: 'CartProducts',
    underscored: true
  })
  return CartProduct
}
