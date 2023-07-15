'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    stock: DataTypes.DECIMAL
  }, {})
  Product.associate = function (models) {
    Product.belongsToMany(models.Order, {
      through: 'OrderProduct',
      foreignKey: 'product_id',
      as: 'in_orders'
    })
    Product.belongsToMany(models.Cart, {
      through: 'CartProduct',
      foreignKey: 'product_id',
      as: 'in_carts'
    })
  }
  return Product
}
