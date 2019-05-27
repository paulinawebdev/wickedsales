import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
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
    const classCard = this.state.creditCard ? 'label-show' : null;
    const classAddress = this.state.shippingAddress ? 'label-show' : null;

    return (
      <div className="pg-content">
        <div className="checkout-page pg-width">
          <div className="back-btn" onClick={() => this.props.setViewCallback('catalog', {})}><i className="fas fa-chevron-left"></i> Back to Catalog</div>
          <h1>Checkout</h1>
          <div className="checkout-total">Order Total: $0</div>
          <form className="checkout-form" onSubmit={this.submitForm}>
            <div className="form-input">
              <input id="custName" type="text" name="customerName" onChange={this.changeHandler} value={this.state.name} />
              <label className={className} htmlFor="custName">Name</label>
            </div>
            <div className="form-input">
              <input id="custCard" type="text" name="customerCard" onChange={this.changeHandler} value={this.state.creditCard} />
              <label className={classCard} htmlFor="custCard">Credit Card</label>
            </div>
            <div className="form-input">
              <textarea id="custAddress" name="customerAddress" onChange={this.changeHandler} value={this.state.shippingAddress}></textarea>
              <label className={classAddress} htmlFor="custAddress">Shipping Address</label>
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
