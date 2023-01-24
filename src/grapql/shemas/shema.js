import {  gql } from 'graphql-tag';


const user= gql`
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


export default  user