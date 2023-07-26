'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    totalSold: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true
  })
  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    })
    Product.belongsToMany(models.Order, {
      through: models.OrderProduct,
      foreignKey: 'productId'
    })
    Product.belongsToMany(models.Cart, {
      through: models.CartProduct,
      foreignKey: 'productId'
    })
  }
  return Product
}
