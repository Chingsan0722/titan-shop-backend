'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'buyer001',
      account: 'buyer001',
      password: await bcrypt.hash('titaner', 10),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'seller001',
      account: 'seller001',
      password: await bcrypt.hash('titaner', 10),
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
