import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'

import ShowCategories from './ShowCategories';

class AddCategories extends Component {
  state = {
    categories: []
  }

  onSubmit = async ({category}) => {
    const { id } = this.props.user

    this.setState({
      categories: [...this.state.categories, {category}]
    })

    try {
      const response = await axios.post('/create-category', {id, category})
      console.log("The reponse is:", response)

//      dispatch({type: AUTH_USER, payload: response.data.token})


    } catch (error) {
  //    dispatch({type: AUTH_ERROR, payload: 'Email in use'})
      console.log("The error is: ", error);
    }
  }

  componentDidMount() {
    const { id } = this.props.user;
    console.log('the compnendidd did mount props are: ', this.props.user);
    axios.post('/categories', { id: id, dylan: 'ellison' }).then(({ data }) => {
      console.log('The response is: ', data);
      this.setState({
        categories: data,
      });
    });
  }

  render() {
    console.log("The props are: ", this.props)
    const { handleSubmit } = this.props
    return (
      <div>
        <div className="form-container">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <label>Category</label>
              <Field name="category" type="text" component="input" autoComplete="none" />
            </fieldset>
            <div>{this.props.errorMessage}</div>
            <button>Add Category</button>
          </form>
        </div>
        <ShowCategories categories={this.state.categories}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user}

}

export default compose(
  connect(mapStateToProps),
  reduxForm( {form: 'categories'})
)(AddCategories)
