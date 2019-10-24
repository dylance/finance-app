import React, { Component } from 'react'

import requireAuth from './requireAuth'

class Feature extends Component {
  render() {
    return (
      <div>this is the featured component</div>
    )
  }
}

export default requireAuth(Feature)
