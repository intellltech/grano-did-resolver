// @ts-check
'use strict'

const GranoDidResolver = require('./GranoDidResolver')

/**
 * getResolver.
 *
 * @param {import('@eg-easy/grano-did-client').GranoDidClient} client - instance of GranoDidClient
 * @returns {import('did-resolver').ResolverRegistry}
 */
function getResolver (client) {
  return GranoDidResolver.create({
    granoDidClient: client
  })
    .build()
}

module.exports = getResolver

