// @ts-check
'use strict'

const appendDatetimeFields = require('./../utils/appendDatetimeFields')

const TABLE_NAME = 'documents'
const seeders = [
  { id: 1, identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev', version: 1, content: '{"service":["github"]}' },
  { id: 2, identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev', version: 2, content: '{"service":["github","twitter"]}' },
  { id: 3, identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev', version: 3, content: '{"service":["twitter"]}' },
]

/**
 * @module
 * @type {{
 *   up: (
 *     queryInterface: import('sequelize').QueryInterface,
 *     Sequelize: typeof import('sequelize')
 *   ) => Promise<void>,
 *   down: (
 *     queryInterface: import('sequelize').QueryInterface,
 *     Sequelize: typeof import('sequelize')
 *   ) => Promise<void>,
 * }}
 */
module.exports = {
  async up (
    queryInterface,
    Sequelize
  ) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      appendDatetimeFields(seeders)
    )
  },

  async down (
    queryInterface,
    Sequelize
  ) {
    await queryInterface.bulkDelete(TABLE_NAME, {
      id: seeders.map(it => it.id)
    })
  }
}
