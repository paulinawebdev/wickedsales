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

  render() {
    return (
      <div className="checkout-page">
        <div className="pg-width">
          <div className="back-btn" onClick={() => this.props.setViewCallback('catalog', {})}><i className="fas fa-chevron-left"></i> Back to Catalog</div>
          <h1>Checkout</h1>
          <div className="checkout-total">Order Total: $0</div>
          <form className="checkout-form" onSubmit={() => { this.props.setViewCallback(); this.props.placeOrderCallback(); }}>
            <div className="form-input">
              <input id="custName" type="text" name="customerName" onChange={this.changeHandler} value={this.state.name} placeholder="Name" />
              <label htmlFor="custName">Name</label>
            </div>
            <div className="form-input">
              <input id="custCard" type="text" name="customerCard" onChange={this.changeHandler} value={this.state.creditCard} placeholder="Credit Card" />
              <label htmlFor="custCard">Credit Card</label>
            </div>
            <div className="form-input">
              <input id="custAddress" type="text" name="customerAddress" onChange={this.changeHandler} value={this.state.shippingAddress} placeholder="Shipping Address" />
              <label htmlFor="custAddress">Shipping Address</label>
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
