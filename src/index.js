const { GraphQLServer, PubSub } = require("graphql-yoga")

const CHANNEL = "SENSOR"

const typeDefs = `
  type Query {
    hello: String!
  }

  type Sensor {
    time: Int!
    temp: Float!
    humidity: Float!
  }

  type Subscription {
    sensor: Sensor!
  }
`

const resolvers = {
  Query: {
    hello: () => `Hello`,
  },
  Subscription: {
    sensor: {
      subscribe: (parent, args, { pubsub }) => {
        setInterval(
          () =>
            pubsub.publish(CHANNEL, {
              sensor: {
                time: Math.round(Date.now() / 1000),
                temp: +(10 + Math.random() * 10).toFixed(1),
                humidity: +(80 + Math.random() * 10).toFixed(1),
              },
            }),
          1000
        )
        return pubsub.asyncIterator(CHANNEL)
      },
    },
  },
}

const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } })

const options = {
  port: 3000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
}

server.start(options, ({ port }) =>
  console.log(`Server is running on localhost:${port}`)
)
