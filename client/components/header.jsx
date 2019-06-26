import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <header>
        <div className="pg-width">
          <div className="header-content">
            <div className="logo" onClick={() => this.props.setViewCallback('catalog', {})}><h1><i className="fas fa-bolt"></i> Wicked Sales</h1></div>
            <div className="header-cart" onClick={() => this.props.setViewCallback('cart', {})}>
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-amount">({this.props.cartItems.length})</span>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
