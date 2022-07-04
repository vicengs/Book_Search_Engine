/* ----------------------------- */
/* Project  : Book Search Engine */
/* File     : queries.js         */
/* Author   : Vicente Garcia     */
/* Date     : 07/01/2022         */
/* Modified : 07/02/2022         */
/* ----------------------------- */
// Import apollo client module
import { gql } from '@apollo/client';
// Export query for get user information
export const GET_ME = gql`
  {
    me {
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