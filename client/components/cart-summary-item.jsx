import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    let cartItem = this.props.item;
    // eslint-disable-next-line no-console
    console.log('cart item : ', cartItem);
    return (
      <div className="cart-item">
        <div className="cart-item-img"><img src={cartItem.image} /></div>
        <div className="cart-item-desc">
          <div className="cart-item-name">{cartItem.name}</div>
          <div className="cart-item-price">${(cartItem.price / 100).toFixed(2)}</div>
          <div className="cart-item-desc">{cartItem.shortDescription}</div>
        </div>
      </div>
    );
  }
}
