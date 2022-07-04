/* ----------------------------- */
/* Project  : Book Search Engine */
/* File     : typeDefs.js        */
/* Author   : Vicente Garcia     */
/* Date     : 07/01/2022         */
/* Modified : 07/03/2022         */
/* ----------------------------- */
// Import the gql tagged template function
const { gql } = require('apollo-server-express');
// Create queries and mutation types
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: ID
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }
  type Query {
    me: User
    users: [User]
  }
  type Auth {
    token: ID!
    user: User
  }
  input BookInput {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser(username: String!): Auth
    saveBook(book: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;
// export the typeDefs
module.exports = typeDefs;