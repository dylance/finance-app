const { gql } = require('apollo-server-express');
const User = require('../models/user');
const Categories = require('../models/categories');
const Expenses = require('../models/expenses');

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

  type Expenses {
    label: String
    description: String
    spendDate: String
    ammount: String
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

  input addCategoryInput {
    category: String
    _id: ID
  }

  type Query {
    user(email: String): User
    categories(userId: ID): [Categories]
    expenses(userId: ID): [Expenses]
  }

  type Mutation {
    signUp(input: signUpInput): User
    addCategory(input: addCategoryInput): Categories
  }
`;

const resolvers = {
  Query: {
    user: (parent, args) => User.findOne({ email: args.email }),
    categories: (parent, args) => Categories.find({ _user: args.userId }),
    expenses: (parent, args) => Expenses.find({ _user: args.userId }),
  },
  Mutation: {
    signUp: (parent, { input }) => signUp(input),
    addCategory: (parent, { input }) => addCategory(input),
  },
  User: {
    categories(parent) {
      console.log('the parent is: ', parent);
      return Categories.find({ _user: parent.id });
    },
  },
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

function addCategory({ category, _id }) {
  const newCategory = new Categories({
    category,
    _user: _id,
  });

  newCategory.save(function(err) {
    if (err) {
      console.log('the error is: ', err);
    }
  });

  return newCategory;
}

module.exports = { typeDefs, resolvers };
