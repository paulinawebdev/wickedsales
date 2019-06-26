import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      creditCard: '',
      shippingAddress: ''
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  changeHandler(event) {
    switch (event.target.name) {
      case 'customerName':
        this.setState({ name: event.target.value });
        break;
      case 'customerEmail':
        this.setState({ email: event.target.value });
        break;
      case 'customerCard':
        this.setState({ creditCard: event.target.value });
        break;
      case 'customerAddress':
        this.setState({ shippingAddress: event.target.value });
        break;
    }
  }

  submitForm(event) {
    event.preventDefault();

    this.props.placeOrderCallback(this.state);
  }

  render() {
    const className = this.state.name ? 'label-show' : null;
    const classEmail = this.state.email ? 'label-show' : null;
    const classCard = this.state.creditCard ? 'label-show' : null;
    const classAddress = this.state.shippingAddress ? 'label-show' : null;

    const cart = this.props.cartSummary;
    let cartItems = cart.map((cartItem, index) => <CartSummaryItem key={index} item={cartItem} />);

    let cartPrices = cart.map(cartPrice => cartPrice.price);

    function getSum(total, num) {
      return parseInt(total) + parseInt(num);
    }

    let cartTotal = cartPrices.reduce(getSum, 0);

    return (
      <div className="pg-content">
        <div className="checkout-page pg-width">
          <div className="back-btn" onClick={() => this.props.setViewCallback('cart', {})}><i className="fas fa-chevron-left"></i> Back to Cart</div>
          <h1>Checkout</h1>
          <div className="checkout-content">
            <form className="checkout-form" onSubmit={this.submitForm}>
              <h5>Customer Information</h5>
              <div className="form-input">
                <input id="custName" type="text" name="customerName" onChange={this.changeHandler} value={this.state.name} required />
                <label className={className} htmlFor="custName">Name</label>
              </div>
              <div className="form-input">
                <input id="custEmail" type="email" name="customerEmail" onChange={this.changeHandler} value={this.state.email} required />
                <label className={classEmail} htmlFor="custEmail">Email</label>
              </div>
              <div className="form-input">
                <input id="custCard" type="text" name="customerCard" onChange={this.changeHandler} value={this.state.creditCard} required />
                <label className={classCard} htmlFor="custCard">Credit Card</label>
              </div>
              <div className="form-input">
                <textarea id="custAddress" name="customerAddress" onChange={this.changeHandler} value={this.state.shippingAddress} required></textarea>
                <label className={classAddress} htmlFor="custAddress">Shipping Address</label>
              </div>
              <button type="submit" className="btn">Submit</button>
            </form>
            <div className="cart-checkout-summary">
              <h5>Cart Summary</h5>
              {cartItems}
              <div className="cart-total-price">Subtotal: {(cartTotal / 100).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
