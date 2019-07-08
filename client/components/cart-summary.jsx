import React from 'react';
import CartSummaryItem from './cart-summary-item';
import { Link } from 'react-router-dom';

export default class CartSummary extends React.Component {

  render() {
    const cart = this.props.cartSummary;

    const cartPage = this.props.page;
    
    let checkoutBtn = "";
    if (cartPage === "cart-summary") {
      checkoutBtn = <div className="cart-checkout"> <Link to="/checkout"><div className="btn checkout-btn">Checkout</div> </Link> </div>;
    }
    
    let cartItems = cart.map((cartItem) => {
        return <CartSummaryItem key={cartItem.cart_id} page={this.props.page} item={cartItem} quantity={cartItem.quantity} deleteCallback={this.props.deleteCallback} />
    });

    let addedPrice = 0;

    cart.forEach(
      (element)=> {
        let parsedPrice = parseInt(element.price)
        addedPrice += ((parsedPrice / 100) * element.quantity);
      }
    );
    addedPrice = addedPrice.toFixed(2);

    let cartItemsView = (
      <div className="cart-item-container">
        <div className="cart-item">
          <div className="cart-item-desc">Product</div>
          <div className="cart-item-price">Price</div>
          <div className="cart-item-quantity">Quantity</div>
          <div className="cart-item-total">Total</div>
        </div>
        {cartItems}
        <div className="cart-total-price">Subtotal: ${addedPrice}</div>
        {checkoutBtn}
      </div>
    );

    return (
      <React.Fragment>
        {cartItems.length ? cartItemsView : <div className="empty-cart"><img src="/images/empty-cart.svg"/>No Cart Items</div>}
      </React.Fragment>
    );
  }
}
