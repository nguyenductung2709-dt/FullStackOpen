//Server
const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer') //used to create server that enable WebSocket
const { expressMiddleware } = require('@apollo/server/express4')
const { makeExecutableSchema } = require('@graphql-tools/schema')

//WebSocket
const { WebSocketServer } = require('ws') //WebSocketAPI to notify change in server
const { useServer } = require('graphql-ws/lib/use/ws')

const http = require('http')
const express = require('express') //standalone server does not enable WebSocket so use express
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

//typeDefs and resolvers
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

//models
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user');

//dotenv
require('dotenv').config()

// connect database
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

mongoose.set('debug', true);

// setup is now within a function
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        try {
          if (auth && auth.startsWith('Bearer')) {
            const token = auth.substring(7);
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded Token:', decodedToken);
        
            const currentUser = await User.findById(decodedToken.id);
        
            if (currentUser) {
              return { currentUser };
            }
          }
        } catch (error) {
          console.error('Token verification error:', error.message);
        }
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()
