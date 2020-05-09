# GraphQL subscription server example

This is a simple GraphQL subscription server example using [graphql-yoga](https://github.com/prisma-labs/graphql-yoga).

Run `npm run start` to start the server.

Go to [http://localhost:3000/playground](http://localhost:3000/playground) to launch the GraphQL Playground.

Subscribe to the server:

```graphql
subscription {
  sensor {
    time
    temp
    humidity
  }
}
```

## Tools

- [graphql-yoga](https://github.com/prisma-labs/graphql-yoga)
