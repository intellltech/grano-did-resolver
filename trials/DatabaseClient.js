// @ts-check
'use strict'

const { Resolver } = require('did-resolver')
const getResolver = require('../lib/resolver')

const DatabaseClient = require('../src/app/DatabaseClient')

const main = async () => {
  const dbClient = new DatabaseClient()

  const granoDidDocument = await dbClient.fetchGranoDidDocument({ identifier: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'})

  console.log(granoDidDocument)
}

main()
