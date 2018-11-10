const express = require('express')
const graphqlHTTP = require('express-graphql') 

const PORT = 4000
const app = express()

app.listen( PORT, () => {
    console.log( `Server listening on port ${PORT}`)
})