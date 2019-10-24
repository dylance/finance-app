import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './header-style.css'

class Header extends Component {
  renderLinks() {
    if(this.props.authenticated) {
      return (
        <div>
          <Link to='/sign-out'>Sign out</Link>
          <Link to='/feature'>feature page</Link>
        </div>
      )
    } else {
      return (
        <div>
          <Link to='/sign-up'>Sign up</Link>
          <Link to='/sign-in'>Sign in</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="header">
        <Link to='/'>Redux Auth</Link>
        {this.renderLinks()}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated}

}

export default connect(mapStateToProps)(Header)
