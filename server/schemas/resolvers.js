/* ----------------------------- */
/* Project  : Book Search Engine */
/* File     : resolvers.js       */
/* Author   : Vicente Garcia     */
/* Date     : 07/01/2022         */
/* Modified : 07/03/2022         */
/* ----------------------------- */
// Import authentication method from apollo server express
const { AuthenticationError } = require('apollo-server-express');
// Import models (tables User & Book)
const { User } = require('../models');
// Import token authorization
const { signToken } = require('../utils/auth');
// Define resolver
const resolvers = {
  // Get query
  Query: {
    // Return user data
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    // Test how many users there are
    users: async () => {
      return User.find()
      .select('-__v -password');
    }
  },
  // Set inserts and deletes
  Mutation: {
    // Authorization to access
    login: async (parent, { email, password }) => {
      const userLog = await User.findOne({ email });
      if (!userLog) {
        throw new AuthenticationError("Can't find this email");
      }
      const passwordOk = await userLog.isCorrectPassword(password);
      if (!passwordOk) {
        throw new AuthenticationError("Wrong password!");
      }
      const token = signToken(userLog);
      return { token, userLog };
    },
    // Add new user
    addUser: async (parent, args) => {
      const newUser = await User.create(args);
      const token = signToken(newUser);
      return {token, newUser};
    },
    // Include remove user for developers to clean database
    removeUser: async (parent, { username }, context) => {
      if (context.user) {
        const user = await User.findOneAndDelete( {username} );
        return user;
      }  
      throw new AuthenticationError('You need to be logged in!');
    },
    // Save book for user
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const addBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return addBook;
      }  
      throw new AuthenticationError('You need to be logged in!');
    },
    // Delete book and substract from user's books array
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const removeBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return removeBook;
      }  
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};
module.exports = resolvers;