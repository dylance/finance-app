import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import Select from 'react-select'

class AddExpenses extends Component {
  state = {
    categories: []
  }

  onSubmit = async ({category}) => {
    const { _id } = this.props.user

    this.setState({
      categories: [...this.state.categories, {category}]
    })

    try {
      const response = await axios.post('/create-category', {_id, category})
      console.log("The reponse is:", response)

//      dispatch({type: AUTH_USER, payload: response.data.token})


    } catch (error) {
  //    dispatch({type: AUTH_ERROR, payload: 'Email in use'})
      console.log("The error is: ", error);
    }
  }

  onChangeSelect = (disciplineObject) => {
    console.log("I have been changed")
  // const disciplineId = disciplineObject ? disciplineObject.value : '';
  // const { dispatch } = this.props;
  // dispatch(change('registration', 'disciplineId', disciplineId));
  // this.setState({ disciplineId, showDisciplineError: false });
};

  componentDidMount() {
    const { _id } = this.props.user;
    console.log('the compnendidd did mount props are:::: ', this.props.user._id);
    axios.post('/categories', { _id: _id} ).then(({ data }) => {
      console.log('The response is: ', data);
      this.setState({
        categories: data,
      });
    });
  }

  render() {
    const categoriesLabel = this.state.categories.map(cat => {
      console.log("cat .cat is: ", cat.category)
      return {
        value: cat.category,
        label: cat.category
      }
    })
    console.log("The lengths are: ", this.state.categories.length)

    console.log("The props are: ", this.props)
    console.log("The categories areddd: ", this.state.categories)
    const { handleSubmit } = this.props
    return (
      <div>
        <div className="form-container">
          <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label>Expense</label>
            <Field name="category" type="text" component="input" autoComplete="none" />
          </fieldset>
          <fieldset>
            <label>Note</label>
            <Field name="category" type="text" component="input" autoComplete="none" />
          </fieldset>
          <fieldset>
            <label>Ammount</label>
            <Field name="category" type="text" component="input" autoComplete="none" />
          </fieldset>
          <fieldset>
            <label>Category</label>
            <Select
              className="select-discipline"
              clearable={false}
              name="discipline"
              onChange={this.onChangeDiscipline}
              options={categoriesLabel}
              placeholder="Select"
              searchable={false}
              value={'category'}
            />
          </fieldset>

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
