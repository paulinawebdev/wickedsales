import React from 'react';
import { Link } from 'react-router-dom';

export default class CartSummaryItem extends React.Component {

  render() {
    const cartPage = this.props.page;
    const cartItem = this.props.item;
    let cartPrice = (parseInt(cartItem.price) / 100).toFixed(2);
    let removeBtn = "";
    if (cartPage === "cart-summary") {
      removeBtn = <div className="cart-item-remove" onClick={()=>this.props.deleteCallback(cartItem.cart_id)}>Remove</div>;
    }
    return (
      <div className="cart-item">
        <div className="cart-item-desc">
          <div className="cart-item-img"><Link to={"/product/" + cartItem.prod_id}><img src={cartItem.image} /></Link></div>
          <div>
            <p>{cartItem.name}</p>
            {removeBtn}
          </div>
        </div>
        <div className="cart-item-price">${cartPrice}</div>
        <div className="cart-item-quantity">{this.props.quantity}</div>
        <div className="cart-item-total">${(cartPrice * this.props.quantity).toFixed(2)}</div>
      </div>
    );
  }
}
