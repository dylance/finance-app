const { gql } = require('apollo-server-express');
const User = require('../models/user');
const Categories = require('../models/categories');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    email: String
    id: String
    firstName: String
    lastName: String
    what: String
    categories: [Categories]
  }

  type Categories {
    category: String
    user: String
  }

  input userInput {
    email: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    user(email: String): User
  }
`;

console.log('The dirname is: ', __dirname);
// Categories.find({_user: id })

const resolvers = {
  Query: {
    user: (parent, args) => User.findOne({ email: args.email }),
  },
  User: {
    categories(parent) {
      console.log('the parent is: ', parent);
      return Categories.find({ _user: parent.id });
    },
  },
};

module.exports = { typeDefs, resolvers };
