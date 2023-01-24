import { gql } from "graphql-tag";
import user from "./shema";


const base = gql`
  type Query {
    _: String!
  }

  type Mutation {
    _: String!
  }
`;
const typeDefs = [base, user];
export default typeDefs;
