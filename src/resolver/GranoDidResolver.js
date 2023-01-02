// @ts-check
'use strict'

const DatabaseClient = require('../app/DatabaseClient')

/**
 * GranoDidResolver.
 */
class GranoDidResolver {
  /**
   * constructor.
   *
   * @param {GranoDidResolverParams} params - grano did resolver params
   */
  constructor ({
    databaseClient = new DatabaseClient()
  } = {}) {
    this.client = databaseClient
  }

  /**
   * create.
   *
   * @param {GranoDidResolverParams} params - grano did resolver params
   * @returns {GranoDidResolver}
   */
  static create (params = {}) {
    return new this(params)
  }

  /**
   * resolve.
   *
   * @param {string} did
   * @param {import('did-resolver').ParsedDID} parsedDid - parsed Did Object
   * @param {import('did-resolver').DIDResolutionOptions} options
   * @returns {Promise<import('did-resolver').DIDResolutionResult>}
   */
  async resolve (
    did,
    parsedDid,
    options = {},
  ) {
    const controllerParam = {
      identifier: parsedDid.id,
    }

    const controllerResponse = await this.client.fetchGranoDidDocument(controllerParam)

    return {
      didResolutionMetadata: {},
      didDocumentMetadata: {},
      didDocument: {
        id: controllerResponse.controller
      },
    }
  }

  /**
   * build.
   *
   * @returns {import('did-resolver').ResolverRegistry}
   */
  build () {
    return {
      grn: this.resolve.bind(this)
    }
  }
}

module.exports = GranoDidResolver

/**
 * @typedef {{
 *   databaseClient?: DatabaseClient
 * }} GranoDidResolverParams
 */
