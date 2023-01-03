// @ts-check
'use strict'

const GranoDidResolver = require('../../src/resolver/GranoDidResolver')
const DatabaseClient = require('../../src/app/DatabaseClient')

describe('GranoDidResolver', () => {
  describe('.create()', () => {
    test('instance of the class', async () => {
      const databaseClient = new DatabaseClient()
      const granoDidResolverParams = {
        databaseClient: /** @type{*} */ (databaseClient),
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
              didDocument: { id: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev' }
            },
          }
        }
      ]

      test.each(tables)('params.did: $params.did', async ({
        params,
        expected,
      }) => {
        const databaseClient = new DatabaseClient()
        const granoDidResolverParams = {
          databaseClient: /** @type{*} */ (databaseClient),
        }
        const resolver = GranoDidResolver.create(granoDidResolverParams)

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
