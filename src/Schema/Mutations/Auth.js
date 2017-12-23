const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString
} = graphql;
const UserType = require('../Types/UserType');
const AuthService = require('../../Services/Auth');

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                return AuthService.signup({ email, password, req });
            }
        },
        // login: {
        //
        // },
        // logout: {
        //
        // }
    }
});

module.exports = mutation;
