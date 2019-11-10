import { AUTH_USER, AUTH_ERROR, GET_USER, CLEAR_USER, ADD_CATEGORIES } from './types'
import axios from 'axios'

export const signup = ({ email, password, firstName, lastName }, callback) => {
  return async dispatch => {
    try {
      const response = await axios.post('/signup', {email, password, firstName, lastName})

      dispatch({type: AUTH_USER, payload: response.data.token})
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', email);
      callback()
    } catch (error) {
      dispatch({type: AUTH_ERROR, payload: 'Email in use'})
    }
  }
}

export const signin = ({ email, password }, callback) => {
  return async dispatch => {
    try {
      const response = await axios.post('/signin', {email, password})

      dispatch({type: AUTH_USER, payload: response.data.token})
      dispatch({type: GET_USER, payload: response.data.user})
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', email);
      callback()
    } catch (error) {
      dispatch({type: AUTH_ERROR, payload: 'Invalid login'})
    }
  }
}

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');

  return {
    type: AUTH_USER,
    payload: ''
  }
}

export const clearUser = () => {
  return {
    type: CLEAR_USER
  }
}

// export const addCategories = ({ category }) => {
//   return async dispatch => {
//     try {
//       const response = await axios.post('/create-category', {id, category})
//
//       dispatch({type: AUTH_USER, payload: response.data.token})
//       localStorage.setItem('token', response.data.token);
//
//     } catch (error) {
//       dispatch({type: AUTH_ERROR, payload: 'Email in use'})
//     }
//   }
// }
