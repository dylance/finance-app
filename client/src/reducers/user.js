import { GET_USER, CLEAR_USER }  from '../actions/types'

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_USER:
      const { firstName, lastName, _id } = action.payload
      return { firstName, lastName, id: _id}
    case CLEAR_USER:
    console.log("this should be run")
      return {}
    default:
      return state;
  }
}
