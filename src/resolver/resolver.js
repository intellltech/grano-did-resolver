// @ts-check
'use strict'

const GranoDidResolver = require('./GranoDidResolver')

/**
 * getResolver.
 *
 * @param {import('./../app/DatabaseClient')} client - instance of DatabaseClient
 * @returns {import('did-resolver').ResolverRegistry}
 */
function getResolver (client) {
  return GranoDidResolver.create({
    databaseClient: client
  })
    .build()
}

module.exports = getResolver

