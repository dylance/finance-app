import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import Select from 'react-select'

class AddExpenses extends Component {
  state = {
    categories: [],
    selectedCategory: null,
  }

  onSubmit = async (values) => {
    const { _id: userId } = this.props.user
    const { label, description, ammount, spendDate } = values
    const { value: catId } = this.state.selectedCategory;

    try {
      const response = await axios.post('/create-expense', { label, description, userId, catId, ammount, spendDate})
      console.log("The reponse is:", response)
    } catch (error) {
      console.log("The error is: ", error);
    }
  }

  onChangeSelect = (selectedCategory) => {
    console.log("I have been changed, the categories are:  ")
    this.setState({ selectedCategory });

};

  componentDidMount() {
    const { _id } = this.props.user;

    axios.post('/categories', { _id: _id} ).then(({ data }) => {

      this.setState({
        categories: data,
      });
    });
  }

  render() {
    const categoriesLabel = this.state.categories.map(cat => {
      return {
        value: cat._id,
        label: cat.category
      }
    })


    const { handleSubmit } = this.props
    return (
      <div>
        <div className="form-container">
          <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label>Expense</label>
            <Field name="label" type="text" component="input" autoComplete="none" />
          </fieldset>
          <fieldset>
            <label>Note</label>
            <Field name="description" type="text" component="input" autoComplete="none" />
          </fieldset>
          <fieldset>
            <label>Ammount</label>
            <Field name="ammount" type="text" component="input" autoComplete="none" />
          </fieldset>
          <fieldset>
            <label>Ammount</label>
            <Field name="spendDate" type="date" component="input" autoComplete="none" />
          </fieldset>
          <fieldset>
            <label>Category</label>
            <Select
              className="select-discipline"
              clearable={false}
              name="discipline"
              onChange={this.onChangeSelect}
              options={categoriesLabel}
              placeholder="Select"
              searchable={false}
              value={this.state.selectedCategory}
            />
          </fieldset>
          <button type="submit">Submit</button>

          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user}

}

export default compose(
  connect(mapStateToProps),
  reduxForm( {form: 'expenses'})
)(AddExpenses)
