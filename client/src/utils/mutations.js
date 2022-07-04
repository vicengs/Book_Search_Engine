/* ----------------------------- */
/* Project  : Book Search Engine */
/* File     : mutations.js       */
/* Author   : Vicente Garcia     */
/* Date     : 07/01/2022         */
/* Modified : 07/02/2022         */
/* ----------------------------- */
// Import apollo client module
import { gql } from '@apollo/client';
// Export to get user logged
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
// Export to create new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
// Export to save a book for user
export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      username
      savedBooks {
        bookId
        title
      }
    }
  }
`;
// Export to remove a book for user
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;