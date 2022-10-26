// @ts-check
'use strict'

const { DidConfig } = require('@eg-easy/grano-did-client')

const mockDidConfigParams = {
  endPoint: 'http://localhost:26657',
  mnemonic: 'estate giraffe icon february goat observe actor left armed zone million note system myth coconut series calm steak dinosaur twin immune mansion morning drastic',
  prefix: 'wasm',
  fromAddress: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
}

const mockDidConfig = DidConfig.create(mockDidConfigParams)

module.exports = {
  mockDidConfigParams,
  mockDidConfig,
}
