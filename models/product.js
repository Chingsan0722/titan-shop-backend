'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    stock: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true
  })
  Product.associate = function (models) {
    Product.hasOne(models.Category, {
      foreignKey: 'categoryId'
    })
    Product.belongsTo(models.Order, {
      foreignKey: 'productId',
      as: 'OrderProducts'
    })
    Product.belongsTo(models.Cart, {
      foreignKey: 'productId',
      as: 'CartProducts'
    })
  }
  return Product
}
