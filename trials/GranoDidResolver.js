// @ts-check
'use strict'

const { Resolver } = require('did-resolver')
const getResolver = require('../src/resolver/resolver')

const DatabaseClient = require('../src/app/DatabaseClient')

const main = async () => {
  const dbClient = new DatabaseClient()

  const granoDidResolver = getResolver(dbClient)

  const didResolver = new Resolver(granoDidResolver)

  const didDocument = await didResolver.resolve('did:grn:grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev', {})

  console.dir(didDocument, { depth: 3 })
}

main()
