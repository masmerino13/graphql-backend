const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription');
const db = require('./db');

function createServer() {
  return new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        AuthPayload,
        Subscription
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;