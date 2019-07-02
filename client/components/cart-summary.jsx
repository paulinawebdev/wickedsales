import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { Link } from 'react-router-dom';

export default class CartSummary extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {

    const cart = this.props.cartSummary;
    let cartItems = cart.map((cartItem, index) => {
      <CartSummaryItem key={index} item={cartItem} />;
    });
    let cartPrices = cart.map(cartPrice => cartPrice.price);

    function getSum(total, num) {
      return parseInt(total) + parseInt(num);
    }

    let cartTotal = cartPrices.reduce(getSum, 0);

    let cartItemsView = (
      <div className="cart-item-container">
        <div className="cart-item">
          <div className="cart-item-desc">Product</div>
          <div className="cart-item-price">Price</div>
          <div className="cart-item-quantity">Quantity</div>
          <div className="cart-item-total">Total</div>
        </div>
        {cartItems}
        <div className="cart-total-price">Subtotal: {(cartTotal / 100).toFixed(2)}</div>
        <div className="cart-checkout">
          <Link to="/checkout"><div className="btn checkout-btn">Checkout</div></Link>
        </div>
      </div>
    );

    return (
      <div className="pg-content">
        <div className="cart-summary pg-width">
          <div className="back-btn"><Link to="/"><i className="fas fa-chevron-left"></i> Back to Catalog</Link></div>
          <h1>My Cart</h1>
          {cartItems.length ? cartItemsView : 'No Cart Items'}
        </div>
      </div>
    );
  }
}
