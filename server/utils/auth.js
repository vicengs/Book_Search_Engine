/* ----------------------------- */
/* Project  : Book Search Engine */
/* File     : auth.js            */
/* Modify   : Vicente Garcia     */
/* Modified : 07/01/2022         */
/* ----------------------------- */
const jwt = require('jsonwebtoken');
// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';
module.exports = {
  // Function for our authenticated routes
  authMiddleware: function ({req}) {
    //let token = req.query.token || req.headers.authorization;
    // Allows token to be sent via req.body, req.query or req.headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      // Return request
      return req;
    }
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    // Return request
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
