'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'buyer001',
      account: 'buyer001',
      password: await bcrypt.hash('titaner', 10),
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'seller001',
      account: 'seller001',
      password: await bcrypt.hash('titaner', 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
