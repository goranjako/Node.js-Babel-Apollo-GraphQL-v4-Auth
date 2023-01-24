import { GraphQLError } from 'graphql';
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config();

module.exports = (req) => {
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
        throw new GraphQLError('Invalid/Expired token');
      }
    }
    throw new GraphQLError("Authentication token must be 'Bearer [token]'");
  }
// error handling
  throw new GraphQLError('Authorization header must be provided');
};
