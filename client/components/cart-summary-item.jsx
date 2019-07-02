import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    let cartItem = this.props.item;
    return (
      <div className="cart-item">
        <div className="cart-item-desc">
          <div className="cart-item-img"><img src={cartItem.image} /></div>
          <p>{cartItem.name}</p>
        </div>
        <div className="cart-item-price">${(parseInt(cartItem.price) / 100).toFixed(2)}</div>
        <div className="cart-item-quantity">1</div>
        <div className="cart-item-total">${(parseInt(cartItem.price) / 100).toFixed(2)}</div>
      </div>
    );
  }
}
