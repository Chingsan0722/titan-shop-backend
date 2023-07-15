'use strict'
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
  }, {})
  Category.associate = function (models) {
    Category.belongsTo(models.Product,
      { foreignKey: 'categoryId' })
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    underscored: true
  })
  return Category
}
