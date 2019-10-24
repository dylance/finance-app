import { AUTH_USER, AUTH_ERROR } from './types'
import axios from 'axios'

export const signup = ({ email, password }, callback) => {
  return async dispatch => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {email, password})

      dispatch({type: AUTH_USER, payload: response.data.token})
      localStorage.setItem('token', response.data.token);
      callback()
    } catch (error) {
      dispatch({type: AUTH_ERROR, payload: 'Email in use'})
    }
  }
}

export const signin = ({ email, password }, callback) => {
  return async dispatch => {
    try {
      const response = await axios.post('http://localhost:5000/signin', {email, password})

      dispatch({type: AUTH_USER, payload: response.data.token})
      localStorage.setItem('token', response.data.token);
      callback()
    } catch (error) {
      dispatch({type: AUTH_ERROR, payload: 'Invalid login'})
    }
  }
}

export const signout = () => {
  localStorage.removeItem('token')

  return {
    type: AUTH_USER,
    payload: ''
  }
}
