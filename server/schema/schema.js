const graphql = require('graphql')
const data = require('./data')
const _ = require('lodash')

// grap graphql types 
const {
    GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt,
    GraphQLList
} = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(data.author, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        age: { type: GraphQLInt },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(data.book, {authorId: parent.id})
            }
        }
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
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return data.book
            }
        },
        author: {
            type: AuthorType,
            args:{
                id: { type: GraphQLID }
            },
            resolve(parent, args) { return _.find(data.author, {id: args.id })}
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){ return data.author }
        }
    }
})

const schema = { query: RootQuery }

module.exports = new GraphQLSchema(schema)