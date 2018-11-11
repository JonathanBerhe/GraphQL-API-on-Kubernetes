const graphql = require('graphql')
const data = require('./data')
const _ = require('lodash')

// grap graphql types into..
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLString}
            },
            resolve(parent, args){
               return _.find(data, {id: args.id})
            }
        }
    }
})

const schema = { query: RootQuery }

module.exports = new GraphQLSchema(schema)