import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <header>
        <div className="pg-width">
          <div className="header-content">
            <div className="logo"><h1><i className="fas fa-bolt"></i> Wicked Sales</h1></div>
            <div className="cart">
              <span className="cart-amount">{this.props.cartItems.length} Items</span>
              <i className="fas fa-shopping-cart"></i>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
