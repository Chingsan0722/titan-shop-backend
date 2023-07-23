'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const category = ['上衣類', '下身類', '內衣類', '配件類', '鞋類']
    for (let i = 0; i < category.length; i++) {
      await queryInterface.bulkInsert('Categories', [{
        name: category[i],
        available: true,
        created_at: new Date(),
        updated_at: new Date()
      }])
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
