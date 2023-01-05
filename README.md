# Grano DID Resolver
Grano DID Resolver is a program that returns values according to the [DID specification](https://www.w3.org/TR/did-core/) defined by the [W3C](https://www.w3.org/). It depends on [Sequelize](https://github.com/sequelize/sequelize) and all values refer to the off-chain database.

## How to Use
0. Create Mariadb and export data from [grano-did-contract](https://github.com/eg-easy/grano-did-contract) using [grano-did-exporter](https://github.com/eg-easy/grano-did-exporter)

1. Set DB configuration in `.env`
```env
DATABASE=grano
USERNAME=root
PASSWORD=password
DIALECT=mariadb
HOST=localhost
PORT=3306
```

2. Call Resolver
```index.js
const { Resolver } = require('did-resolver')
const { getResolver, DatabaseClient } = require('@eg-easy/grano-did-resolver')

const main = async () => {
  const dbClient = new DatabaseClient()

  const granoDidResolver = getResolver(dbClient)

  const didResolver = new Resolver(granoDidResolver)

  const didDocument = await didResolver.resolve('did:grn:grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev', {})

  console.dir(didDocument, { depth: 3 })
}

main()
```

## Sample Response
```js
{
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
    service: [ 'twitter' ]
  }
}
```

## References
- https://github.com/eg-easy/grano-did
- https://github.com/EG-easy/grano-did-client
- https://github.com/EG-easy/grano-did-contract
- https://github.com/EG-easy/grano-did-exporter
- https://github.com/EG-easy/grano-did-node
