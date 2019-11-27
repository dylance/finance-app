import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import ShowCategories from './ShowCategories';

class AddCategories extends Component {
  state = {
    categories: [],
    errorMessage: '',
  };

  onSubmit = async ({ category }) => {
    const { _id } = this.props.user;

    if (!category) {
      this.setState({ errorMessage: 'need category fool' });
      return;
    }

    this.setState({
      categories: [...this.state.categories, { category }],
    });

    try {
      const response = await axios.post('/create-category', { _id, category });

      //      dispatch({type: AUTH_USER, payload: response.data.token})
    } catch (error) {
      //    dispatch({type: AUTH_ERROR, payload: 'Email in use'})
      console.log('The error is: ', error);
    }
  };

  componentDidMount() {
    const { _id } = this.props.user;

    axios.post('/categories', { _id: _id }).then(({ data }) => {
      this.setState({
        categories: data,
      });
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="form-container">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <label>Category</label>
              <Field
                name="category"
                type="text"
                component="input"
                autoComplete="none"
              />
            </fieldset>
            <div>{this.state.errorMessage}</div>
            <div>{this.props.errorMessage}</div>
            <button>Add Category</button>
          </form>
        </div>
        <ShowCategories categories={this.state.categories} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'categories' }),
)(AddCategories);
