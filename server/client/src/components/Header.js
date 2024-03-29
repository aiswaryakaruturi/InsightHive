import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google" style={{ color: 'black' }}>Login With Google</a></li>;
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="3" style={{ margin: '0 10px', color: 'black' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2"><a href="/api/logout" style={{ color: 'black' }}>Logout</a></li>
        ];
    }
  }

  render() {
    return (
      <nav className="header-nav" style={{ backgroundColor: 'white', fontFamily: 'Arial, sans-serif', padding: 0 }}>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="brand-logo"
            style={{ color: 'black', marginLeft: '10px', fontWeight: 'bold' }}
          >
            FeedHub
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
