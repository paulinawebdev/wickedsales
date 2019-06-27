import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {

  render() {
    return (
      <header>
        <div className="pg-width">
          <div className="header-content">
            <div className="logo"><Link to="/"><h1><i className="fas fa-bolt"></i> Wicked Sales</h1></Link></div>
            <Link className="header-cart" to="/cart">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-amount">({this.props.cartItems.length})</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
