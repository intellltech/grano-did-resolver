// @ts-check
'use strict'

const DatabaseClient = require('../../src/app/DatabaseClient')

describe('DatabaseClient', () => {
  describe('.findController()', () => {
    describe('simple pattern', () => {
      const tables = [
        {
          params: {
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
          },
          expected: {
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            controller: 'grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m',
            version: 1,
          }
        }
      ]

      test.each(tables)('params.identifier: $params.identifier', async ({
        params,
        expected,
      }) => {
        const databaseClient = new DatabaseClient()
        const actual = await databaseClient.findController(params)

        expect(actual).toMatchObject(expected)
      }
      )
    })
  })
})

describe('DatabaseClient', () => {
  describe('.findDocument()', () => {
    describe('simple pattern', () => {
      const tables = [
        {
          params: {
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
          },
          expected: {
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
            content: '{"service":["twitter"]}',
            version: 3,
          }
        }
      ]

      test.each(tables)('params.identifier: $params.identifier', async ({
        params,
        expected,
      }) => {
        const databaseClient = new DatabaseClient()
        const actual = await databaseClient.findDocument(params)

        expect(actual).toMatchObject(expected)
      }
      )
    })
  })
})

describe('DatabaseClient', () => {
  describe('.fetchGranoDidDocument()', () => {
    describe('simple pattern', () => {
      const tables = [
        {
          params: {
            identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev',
          },
          expected: {
            controller: 'grano1m2pz9nj72lj2yxnpcmxqwfwk50v35gq7wd399m',
            service: ['twitter']
          }
        }
      ]

      test.each(tables)('params.identifier: $params.identifier', async ({
        params,
        expected,
      }) => {
        const databaseClient = new DatabaseClient()
        const actual = await databaseClient.fetchGranoDidDocument(params)

        expect(actual).toMatchObject(expected)
      }
      )
    })
  })
})

