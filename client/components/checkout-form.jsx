import React from 'react';
import { Link } from 'react-router-dom';
import CartSummary from './cart-summary';
import { withRouter } from 'react-router-dom'

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      creditCard: '',
      shippingAddress: '',
      formComplete: true
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
  checkForm() {
    if (!this.state.name || !this.state.email || !this.state.creditCard || !this.state.shippingAddress) {
      this.setState({formComplete: false})
    }
  }

  submitForm(event) {
    event.preventDefault();
    this.props.deleteCart();
    this.props.history.push('/checkout-summary');
  }

  render() {
    let className = this.state.name ? 'label-show' : null;
    let classEmail = this.state.email ? 'label-show' : null;
    let classCard = this.state.creditCard ? 'label-show' : null;
    let classAddress = this.state.shippingAddress ? 'label-show' : null;
    let errorMsg = this.state.formComplete ? "" : <div className="error-msg">Form must be completed</div>


    return (
      
      <div className="pg-content">
        <div className="checkout-page pg-width">
          <div className="back-btn"><Link to="/cart"><i className="fas fa-chevron-left"></i> Back to Cart</Link></div>
          <h1>Checkout</h1>
          <div className="checkout-content">
            <form className="checkout-form" onSubmit={this.submitForm}>
              <h4>Customer Information</h4>
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
              <div className="form-input">
                <small>*Please do not use real information. This is not a real shop.</small>
              </div>
              <button type="submit" className="btn" onClick={this.checkForm}>Place Order</button>
              {errorMsg}
            </form>
            <div className="cart-checkout-summary">
              <h4>Cart Summary</h4>
              <CartSummary cartSummary={this.props.cartSummary} page="checkout" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
