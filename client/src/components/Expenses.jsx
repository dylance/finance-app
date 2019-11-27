import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Expenses extends PureComponent {

  state = {
    categories: []
  }

  componentDidMount() {
    const { _id } = this.props.user;
    console.log("The id is: ", _id)
    axios.post('/expenses', { _id }).then(({ data }) => {
      console.log("Thedata is: ", data)
      this.setState({
        categories: data,
      });
    });
  }

  render() {
    return (
    <div>
      {this.state.categories.map(expense => {
        return (
          <h3 key={expense.label}>{expense.label}</h3>
        )

      })}
    </div>
  )
  }
}

function mapStateToProps(state) {
  return { user: state.user}
}

export default connect(mapStateToProps)(Expenses);
