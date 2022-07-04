/* ----------------------------- */
/* Project  : Book Search Engine */
/* File     : server.js          */
/* Modify   : Vicente Garcia     */
/* Modified : 07/01/2022         */
/* ----------------------------- */
const express = require('express');
const path = require('path');
const db = require('./config/connection');
// Import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
// Import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const PORT = process.env.PORT || 3001;
// Create a new Apollo Server and pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // Integrate Apollo server with the Express application as middleware
  server.applyMiddleware({ app });
  // If we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  };
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};
// Call the async function to start the server
startApolloServer(typeDefs, resolvers);