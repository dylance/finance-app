import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './header-style.css'
import '../styles/style.scss'

class Header extends Component {
  renderLinks() {
    if(this.props.authenticated) {
      return (
        <div className="sign-in">
          <Link to='/sign-out'>Sign out</Link>
          <Link to='/feature'>feature page</Link>
        </div>
      )
    } else {
      return (
        <div className="sign-in">
          <Link to='/sign-up'>Sign up</Link>
          <Link to='/sign-in'>Sign in</Link>
        </div>
      )
    }
  }

  render() {
    const { user } = this.props;

    const showUser = <span className="header-user">Welcome {user && user.firstName && user.firstName}</span>

    return (
      <div className="header-container">
        <div className="header">
          <Link to='/'>Finance App {user && user.firstName && showUser}</Link>
          {this.renderLinks()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated,
  user: state.user}

}

export default connect(mapStateToProps)(Header)
