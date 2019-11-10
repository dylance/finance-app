import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

class ShowCategories extends Component {
  render() {
    return (
      <div>
        {this.props.categories.map((cat) => {
          return <h1>{cat.category}</h1>;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default compose(connect(mapStateToProps))(ShowCategories);
