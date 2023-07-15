'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
  }, {})
  Product.associate = function (models) {
    Product.hasOne(models.Category, {
      foreignKey: 'categoryId'
    })
    Product.belongsToMany(models.Order, {
      through: 'OrderProduct',
      foreignKey: 'productId'
    })
    Product.belongsToMany(models.Cart, {
      through: 'CartProduct',
      foreignKey: 'productId'
    })
  }
  Product.init({
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
  return Product
}
