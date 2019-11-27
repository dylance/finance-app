const { gql } = require('apollo-server-express');
const User = require('../models/user');
const Categories = require('../models/categories');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    email: String
    id: ID
    firstName: String
    lastName: String
    what: String
    categories: [Categories]
  }

  type Categories {
    category: String
    id: ID
  }

  input userInput {
    email: String
  }

  input signUpInput {
    email: String
    password: String
    firstName: String
    lastName: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    user(email: String): User
    categories(userId: ID): [Categories]
  }

  type Mutation {
    signUp(input: signUpInput): User
  }
`;

console.log('The dirname is: ', __dirname);

const resolvers = {
  Query: {
    user: (parent, args) => User.findOne({ email: args.email }),
    categories: (parent, args) => Categories.find({ userId: args.id }),
  },
  Mutation: {
    signUp: (parent, { input }) => signUp(input),
  },
  User: {
    categories(parent) {
      console.log('the parent is: ', parent);
      return Categories.find({ _user: parent.id });
    },
  },
  Categories: {},
};

function signUp({ email, password, firstName, lastName }) {
  const user = new User({
    email,
    password,
    firstName,
    lastName,
  });

  user.save(function(err) {
    if (err) {
      console.log('The error is: ', err);
      return err;
    }
  });
  return user;
}

module.exports = { typeDefs, resolvers };
