import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  render() {

    const cart = this.props.cartSummary;
    let cartItems = cart.map((cartItem, index) => <CartSummaryItem key={index} item={cartItem} />);

    let cartPrices = cart.map(cartPrice => cartPrice.price);

    function getSum(total, num) {
      return parseInt(total) + parseInt(num);
    }

    let cartTotal = cartPrices.reduce(getSum, 0);

    let cartItemsView = (
      <div className="cart-item-container">
        <div className="cart-item">
          <div className="cart-item-desc">Product</div>
          <div className="cart-item-quantity">Quantity</div>
          <div className="cart-item-price">Price</div>
        </div>
        {cartItems}
        <div className="cart-total-price">Subtotal: {(cartTotal / 100).toFixed(2)}</div>
        <div className="cart-checkout">
          <div className="btn checkout-btn" onClick={() => this.props.setViewCallback('checkout', {})}>Checkout</div>
        </div>
      </div>
    );

    return (
      <div className="pg-content">
        <div className="cart-summary pg-width">
          <div className="back-btn" onClick={() => this.props.setViewCallback('catalog', {})}><i className="fas fa-chevron-left"></i> Back to Catalog</div>
          <h1>My Cart</h1>
          {cartItems.length ? cartItemsView : 'No Cart Items'}
        </div>
      </div>
    );
  }
}
