const graphql = require('graphql')
const data = require('./data')
const _ = require('lodash')

// grap graphql types into..
const {
    GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt 
} = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        age: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID}
            },
            resolve(parent, args){
               return _.find(data.book, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args:{
                id: { type: GraphQLID }
            },
            resolve(parent, args) { return _.find(data.author, {id: args.id })}
        }
    }
})

const schema = { query: RootQuery }

module.exports = new GraphQLSchema(schema)