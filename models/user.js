'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  User.associate = function (models) {
    User.hasOne(models.Cart, {
      foreignKey: 'userId'
    })
    User.hasMany(models.Order, {
      foreignKey: 'userId'
    })
  }
  return User
}
