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
    // validate did
    // TODO

    const didDocumentParam = {
      identifier: parsedDid.id,
    }

    const granoDidDocumentResult = await this.client.fetchGranoDidDocument(didDocumentParam)

    return this.createDefaultOutput( { did: did }, granoDidDocumentResult )
  }

  /**
   * createDidDocument.
   *
   * @param {{ did: String }} input
   * @param { Object } output
   * @returns {import('did-resolver').DIDDocument}
   */
  createDidDocument (
    input,
    output,
  ) {
    return {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/secp256k1recovery-2020/v2'
      ],
      id: input.did,
      verificationMethod: [
        {
          id: `did:grn:${output.controller}#controller`,
          type: 'EcdsaSecp256k1RecoveryMethod2020',
          controller: `did:grn:${output.controller}`,
        },
      ],
      authentication: [
        `did:grn:${output.controller}#controller`,
      ],
      assertionMethod: [
        `did:grn:${output.controller}#controller`,
      ],
      controller: `did:grn:${output.controller}`,
      service: output.service,
    }
  }

  /**
   * createDefaultOutput.
   *
   * @param {{ did: String }} input
   * @param { Object } output
   * @returns {import('did-resolver').DIDResolutionResult}
   */
  createDefaultOutput (
    input,
    output,
  ) {
    return {
      didResolutionMetadata: {
        contentType: 'application/did+ld+json'
      },
      didDocumentMetadata: {},
      didDocument: this.createDidDocument(input, output)
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
