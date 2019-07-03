import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     cartQuantity: this.props.cartItems
  //   };
  // }

  // componentDidUpdate(prevProps) {
  //   // if (this.state.cartItems !== prevProps.cartItems) {
  //   //   this.setState({cartQuantity: this.props.cartItems})
  //   // }
  //   console.log("state cart items", this.state.cartQuantity);
  //   console.log("prev state", prevProps.cartItems)
  // }

  render() {
    return (
      <header>
        <div className="pg-width">
          <div className="header-content">
            <div className="logo"><Link to="/"><h1><i className="fas fa-bolt"></i> Wicked Sales</h1></Link></div>
            <Link className="header-cart" to="/cart">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-amount">({this.props.cartItems})</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
