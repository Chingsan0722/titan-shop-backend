'use strict'
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
  }, {})
  Category.associate = function (models) {
    Category.hasMany(models.Product,
      { foreignKey: 'categoryId' })
  }
  Category.init({
    name: DataTypes.STRING,
    available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    underscored: true
  })
  return Category
}
