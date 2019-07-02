import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header';
import Banner from './banner';
import Footer from './footer';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cart: [],
      detailId: null
    };

    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.setProjectDetailId = this.setProjectDetailId.bind(this);

  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  getProducts() {
    fetch('/api/products.php')
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
  }

  getCartItems() {
    fetch('/api/cart.php')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }));
  }

  addToCart(product, quantity) {
    fetch('/api/cart.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        let newProductList = this.state.cart.concat(data);
        for (let i = 1; i < quantity; i++) {
          newProductList = newProductList.concat(data);
        }
        this.setState({ cart: newProductList });
      });
  }

  placeOrder(orderInfo) {
    fetch('/api/orders.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderInfo)
    })
      .then(res => res.json())
      .then(data => data);
  }

  setProjectDetailId(id) {
    this.setState({ detailId: id });
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Header cartItems={this.state.cart} />
          <Route exact path="/" render={props =>
            <div>
              <Banner image="/images/banner-1.jpg" />
              <ProductList {...props} products={this.state.products} projIdCallback={this.setProjectDetailId}/>
            </div>
          } />
          <Route path="/product/:id" render={props =>
            <ProductDetails {...props} cartCallback={this.addToCart} id={this.state.detailId} />
          } />
          <Route path="/cart" render={props =>
            <CartSummary {...props} cartSummary={this.state.cart} />
          } />
          <Route path="/checkout" render={props =>
            <CheckoutForm {...props} placeOrderCallback={this.placeOrder} cartSummary={this.state.cart} />
          } />
        </div>
        <Footer/>
      </Router>
    );
  }
}
