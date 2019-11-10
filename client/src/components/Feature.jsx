import React, { Component } from 'react'

import AddCategories from './AddCategories';
import AddExpenses from './AddExpenses';

import requireAuth from './requireAuth'

class Feature extends Component {
  render() {
    return (
      <div>
        <AddCategories />
        <AddExpenses />
      </div>
    )
  }
}

export default requireAuth(Feature)
