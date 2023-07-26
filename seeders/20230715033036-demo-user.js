'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'seller001',
      account: 'seller001',
      password: await bcrypt.hash('titaner', 10),
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }])
    const usersData = []
    for (let i = 1; i < 6; i++) {
      const userData = {
        name: `buyer00${i}`,
        account: `buyer00${i}`,
        password: await bcrypt.hash('titaner', 10),
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      }
      usersData.push(userData)
    }
    await queryInterface.bulkInsert('Users', usersData)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
