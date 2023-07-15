'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const category = ['tops', 'bottoms', 'underwear', 'shoes']
    for (let i = 0; i < category.length; i++) {
      await queryInterface.bulkInsert('Categories', [{
        name: category[i],
        created_at: new Date(),
        updated_at: new Date()
      }])
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
