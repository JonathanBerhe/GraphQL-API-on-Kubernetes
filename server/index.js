const express = require('express')
const graphqlHTTP = require('express-graphql')
const graphqlSchema = require('./schema/schema')

const PORT = 4000
const app = express()

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema
}))

app.listen( PORT, () => {
    console.log( `Server listening on port ${PORT}`)
})