// @ts-check
'use strict'

const GranoDidResolver = require('./GranoDidResolver')

/**
 * getResolver.
 *
 * @param {import('@eg-easy/grano-did-client').DidClient} client - instance of DidClient
 * @returns {import('did-resolver').ResolverRegistry}
 */
function getResolver (client) {
  return GranoDidResolver.create({
    didClient: client
  })
    .build()
}

module.exports = getResolver

