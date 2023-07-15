'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    User.hasOne(models.Cart, {
      foreignKey: 'user_id'
    })
    User.hasMany(models.Order, {
      foreignKey: 'user_id'
    })
  }
  return User
}
