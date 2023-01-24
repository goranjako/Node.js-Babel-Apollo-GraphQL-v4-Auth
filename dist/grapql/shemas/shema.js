"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _graphqlTag = require("graphql-tag");
const user = (0, _graphqlTag.gql)`
type User {
  id:ID!
  fullName:String!
  email:String!,
  password:String!
}
extend type Query {
    userId(id:ID!):User!
    login(input:loginInput!):AuthData!
    users: [User]!
  }
  input userInput {
    fullName:String!
  email:String!,
  password:String!
  }
  input loginInput {
  email:String!,
  password:String!
  }
  type AuthData {
    token: String! 
  }
  extend type Mutation { 
    register(input:userInput!):AuthData!
   
  }
 
`;
var _default = user;
exports.default = _default;