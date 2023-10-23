const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload

  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    profilePic: String

  }
  type Auth {
    token: ID!
    user: User
  }
 
  

  type Query {
    me: User
  }


  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String!, lastName: String!, username: String!, email: String!, profilePic: String!): User
    devDelUser(userId: ID!): User
    deleteUser(username:String!): Auth
  }
`;

module.exports = typeDefs;
