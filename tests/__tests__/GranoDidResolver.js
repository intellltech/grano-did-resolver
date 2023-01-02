// @ts-check
'use strict'

const GranoDidResolver = require('../../src/resolver/GranoDidResolver')

describe('GranoDidResolver', () => {
  describe('.create()', () => {
    test('instance of the class', async () => {
      const resolver = GranoDidResolver.create()

      expect(resolver)
        .toBeInstanceOf(GranoDidResolver)
    })
  })
})

describe('GranoDidResolver', () => {
  describe('.resolve()', () => {
    describe('simple pattern', () => {
      const tables = [
        {
          params: {
            did: 'did:grn:grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            parsedDid: {
              did: 'did:grn:grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
              didUrl: 'did:grn:grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
              method: 'grn',
              id: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            },
            mockResponse: {
              controller: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            },
          },
          expected: {
            payload: {
              identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            },
            response: {
              didResolutionMetadata: {},
              didDocumentMetadata: {},
              didDocument: { id: 'did:grn:grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev' }
            },
          }
        }
      ]

      test.each(tables)('params.did: $params.did', async ({
        params,
        expected,
      }) => {
        const resolver = GranoDidResolver.create()

        const spyGranoDidClient = jest.spyOn(resolver.client, 'fetchGranoDidDocument').mockImplementation(() => Promise.resolve(params.mockResponse))

        const res = await resolver.resolve(params.did, params.parsedDid)

        expect(spyGranoDidClient).toHaveBeenCalledWith(expected.payload)

        expect(res).toMatchObject(expected.response)

        spyGranoDidClient.mockRestore()
      }
      )
    })
  })
})

describe('GranoDidResolver', () => {
  describe('.createDidDocument()', () => {
    describe('simple pattern', () => {
      const tables = [
        {
          params: {
            input: {
              did: 'did:grn:grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            },
            output: {
              controller: 'grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m',
              service: ['twitter'],
            },
          },
          expected: {
            '@context': [
              'https://www.w3.org/ns/did/v1',
              'https://w3id.org/security/suites/secp256k1recovery-2020/v2'
            ],
            id: 'did:grn:grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            verificationMethod: [
              {
                id: 'did:grn:grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m#controller',
                type: 'EcdsaSecp256k1RecoveryMethod2020',
                controller: 'did:grn:grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m'
              }
            ],
            authentication: [
              'did:grn:grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m#controller'
            ],
            assertionMethod: [
              'did:grn:grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m#controller'
            ],
            controller: 'did:grn:grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m',
            service: ['twitter']
          }
        }
      ]

      test.each(tables)('params.input: $params.output', async ({
        params,
        expected,
      }) => {
        const resolver = GranoDidResolver.create()

        const actual = resolver.createDidDocument(params.input, params.output)
        expect(actual).toMatchObject(expected)
      }
      )
    })
  })
})

describe('GranoDidResolver', () => {
  describe('.createDefaultOutput()', () => {
    describe('simple pattern', () => {
      const tables = [
        {
          params: {
            input: {
              did: 'did:grn:grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            },
            output: {
              controller: 'grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m',
              service: ['twitter'],
            },
          },
          expected: {
            didResolutionMetadata: { contentType: 'application/did+ld+json' },
            didDocumentMetadata: {},
            didDocument: {
              '@context': [
                'https://www.w3.org/ns/did/v1',
                'https://w3id.org/security/suites/secp256k1recovery-2020/v2'
              ],
              id: 'did:grn:grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
              verificationMethod: [
                {
                  id: 'did:grn:grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m#controller',
                  type: 'EcdsaSecp256k1RecoveryMethod2020',
                  controller: 'did:grn:grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m'
                }
              ],
              authentication: [
                'did:grn:grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m#controller'
              ],
              assertionMethod: [
                'did:grn:grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m#controller'
              ],
              controller: 'did:grn:grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m',
              service: ['twitter']
            }
          }
        }
      ]

      test.each(tables)('params.input: $params.output', async ({
        params,
        expected,
      }) => {
        const resolver = GranoDidResolver.create()

        const actual = resolver.createDefaultOutput(params.input, params.output)
        expect(actual).toMatchObject(expected)
      }
      )
    })
  })
})
