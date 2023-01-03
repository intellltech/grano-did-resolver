# grano-did-resolver

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
```js
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

## References
- https://github.com/eg-easy/grano-did
- https://github.com/EG-easy/grano-did-client
- https://github.com/EG-easy/grano-did-contract
- https://github.com/EG-easy/grano-did-exporter
- https://github.com/EG-easy/grano-did-node
