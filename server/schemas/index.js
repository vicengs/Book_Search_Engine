/* ----------------------------- */
/* Project  : Book Search Engine */
/* File     : schemas/index.js   */
/* Author   : Vicente Garcia     */
/* Date     : 07/01/2022         */
/* Modified : 07/01/2022         */
/* ----------------------------- */
// Import typeDefs file
const typeDefs = require('./typeDefs');
// Import resolvers file
const resolvers = require('./resolvers');
// Export typeDefs, resolvers
module.exports = { typeDefs, resolvers };