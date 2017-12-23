const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const mutation = require('./Mutations/Auth');

const RootQueryType = require('./Types/RootQueryType');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
});
