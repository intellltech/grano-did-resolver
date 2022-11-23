// @ts-check
'use strict'

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
    granoDidClient
  } = {}) {
    this.client = granoDidClient
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
      contractAddress: 'wasm1qjxu65ucccpg8c5kac8ng6yxfqq85fluwd0p9nt74g2304qw8eyq49pt3a',
      address: parsedDid.id,
    }

    const controllerResponse = await this.client.controller(controllerParam)

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
 *   granoDidClient?: import('@eg-easy/grano-did-client').GranoDidClient,
 * }} GranoDidResolverParams
 */
