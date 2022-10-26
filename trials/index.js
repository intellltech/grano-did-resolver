// @ts-check
'use strict'

const { Resolver } = require('did-resolver')
const getResolver = require('../lib/resolver')

const { DidClient } = require('@eg-easy/grano-did-client')

const mockDidConfigParams = {
  endPoint: 'http://localhost:26657',
  mnemonic: 'estate giraffe icon february goat observe actor left armed zone million note system myth coconut series calm steak dinosaur twin immune mansion morning drastic',
  prefix: 'wasm',
  fromAddress: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
}

const main = async () => {
  const didClient = await DidClient.createFulfilled(mockDidConfigParams)

  const granoResolver = getResolver(didClient)
  const didResolver = new Resolver(granoResolver)

  const doc = await didResolver.resolve('did:grn:cosmos1qa2y6dr228egyhnclkhucx3mwc39pu0qtnkvdk')

  console.log(doc)
}

main()
