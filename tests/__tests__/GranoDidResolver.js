// @ts-check
'use strict'

const GranoDidResolver = require('../../lib/GranoDidResolver')

const MockGranoDidClient = require('../mocks/MockGranoDidClient')

describe('GranoDidResolver', () => {
  describe('.create()', () => {
    test('instance of the class', async () => {
      const mockGranoDidClient = new MockGranoDidClient
      const granoDidResolverParams = {
        granoDidClient: /** @type{*} */ (mockGranoDidClient),
      }
      const resolver = GranoDidResolver.create(granoDidResolverParams)

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
            did: 'did:grn:wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
            parsedDid: {
              did: 'did:grn:wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              didUrl: 'did:grn:wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
              method: 'grn',
              id: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
            },
            mockResponse: {
              controller: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
            },
          },
          expected: {
            payload: {
              contractAddress: 'wasm1qjxu65ucccpg8c5kac8ng6yxfqq85fluwd0p9nt74g2304qw8eyq49pt3a',
              address: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
            },
            response: {
              didResolutionMetadata: {},
              didDocumentMetadata: {},
              didDocument: { id: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u' }
            },
          }
        }
      ]

      test.each(tables)('params.did: $params.did', async ({
        params,
        expected,
      }) => {
        const mockGranoDidClient = new MockGranoDidClient
        const granoDidResolverParams = {
          granoDidClient: /** @type{*} */ (mockGranoDidClient),
        }
        const resolver = GranoDidResolver.create(granoDidResolverParams)

        const spyGranoDidClient = jest.spyOn(resolver.client, 'controller').mockImplementation(() => Promise.resolve(params.mockResponse))

        const res = await resolver.resolve(params.did, params.parsedDid)

        expect(spyGranoDidClient).toHaveBeenCalledWith(expected.payload)

        expect(res).toMatchObject(expected.response)

        spyGranoDidClient.mockRestore()
      }
      )
    })
  })
})
