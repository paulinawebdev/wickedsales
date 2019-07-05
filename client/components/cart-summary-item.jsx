import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    let cartItem = this.props.item;
    let cartPrice = (parseInt(cartItem.price) / 100).toFixed(2);
    return (
      <div className="cart-item">
        <div className="cart-item-desc">
          <div className="cart-item-img"><img src={cartItem.image} /></div>
          <div>
            <p>{cartItem.name}</p>
            <div className="cart-item-remove">Remove</div>
          </div>
        </div>
        <div className="cart-item-price">${cartPrice}</div>
        <div className="cart-item-quantity">{this.props.quantity}</div>
        <div className="cart-item-total">${(cartPrice * this.props.quantity).toFixed(2)}</div>
      </div>
    );
  }
}
