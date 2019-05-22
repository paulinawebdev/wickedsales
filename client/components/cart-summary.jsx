import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  render() {

    const cart = this.props.cartSummary;
    let cartItems = cart.map(cartItem => <CartSummaryItem key={cartItem.id} item={cartItem} />);

    let cartPrices = cart.map(cartPrice => cartPrice.price);

    function getSum(total, num) {
      return total + num;
    }

    let cartTotal = cartPrices.reduce(getSum, 0);

    return (
      <div className="cart-summary pg-width">
        <div className="back-btn" onClick={() => this.props.setViewCallback('catalog', {})}><i className="fas fa-chevron-left"></i> Back to Catalog</div>
        <h1>My Cart</h1>
        {cartItems.length ? cartItems : 'No Cart Items'}
        <div className="cart-total-price">Item Total: {(cartTotal / 100).toFixed(2)}</div>
      </div>
    );
  }
}
