import React from 'react';
import reactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'
import Welcome from './components/Welcome'
import Signup from './components/auth/Signup'
import Signout from './components/auth/Signout'
import Signin from './components/auth/Signin'
import Feature from './components/Feature'

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token')},
    user: JSON.parse(localStorage.getItem('user'))
  },
  applyMiddleware(reduxThunk)
)

reactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
       <Route path="/" exact component={Welcome}></Route>
       <Route path="/sign-up" exact component={Signup}></Route>
       <Route path="/feature" exact component={Feature}></Route>
       <Route path="/sign-out" exact component={Signout}></Route>
       <Route path="/sign-in" exact component={Signin}></Route>
      </ App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
)
