import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };

    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);

  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  getProducts() {
    fetch('api/products.php')
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
  }

  getCartItems() {
    fetch('api/cart.php')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }));
  }

  addToCart(product) {
    fetch('api/cart.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        const newProductList = this.state.cart.concat(data);
        this.setState({ cart: newProductList });
      });
  }

  placeOrder(order) {
    fetch('api/orders.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ view: { name: 'catalog', params: {} } });
      });
  }

  setView(name, params) {
    this.setState(
      {
        view: {
          name: name,
          params: params
        }
      });
  }

  render() {

    let view;

    if (this.state.view.name === 'catalog') {
      view = <ProductList setViewCallback={this.setView} products={this.state.products} />;
    } else if (this.state.view.name === 'details') {
      view = <ProductDetails setViewCallback={this.setView} cartCallback={this.addToCart} id={this.state.view.params.id} />;
    } else if (this.state.view.name === 'cart') {
      view = <CartSummary setViewCallback={this.setView} cartSummary={this.state.cart} />;
    } else if (this.state.view.name === 'checkout') {
      view = <CheckoutForm setViewCallback={this.setView} placeOrderCallback={this.placeOrder} />;
    }

    return (
      <div>
        <Header cartItems={this.state.cart} setViewCallback={this.setView} />
        {view}
      </div>
    );
  }
}
