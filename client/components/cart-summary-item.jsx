import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    let cartItem = this.props.item;
    // eslint-disable-next-line no-console
    console.log('cart item : ', cartItem);
    return (
      <div className="cart-item">
        <div className="cart-item-img">testing</div>
        <div className="cart-item-desc">name here</div>
      </div>
    );
  }
}
