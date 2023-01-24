"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _graphql = require("graphql");
var _dotenv = _interopRequireDefault(require("dotenv"));
const jwt = require('jsonwebtoken');
_dotenv.default.config();
module.exports = req => {
  // context = { ...headers }
  const authHeader = req.req.headers.authorization;
  if (authHeader) {
    // convention for tokens: "Bearer ..."
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        return user;
      } catch (err) {
        throw new _graphql.GraphQLError('Invalid/Expired token');
      }
    }
    throw new _graphql.GraphQLError("Authentication token must be 'Bearer [token]'");
  }
  // error handling
  throw new _graphql.GraphQLError('Authorization header must be provided');
};