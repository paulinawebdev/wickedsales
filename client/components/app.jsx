import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

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
    return (
      <div>
        <Header cartItems={this.state.cart} />
        {this.state.view.name === 'catalog' ? <ProductList products={this.state.products} setViewCallback={this.setView} /> : <ProductDetails backCallback={this.setView} cartCallback={this.addToCart} id={this.state.view.params.id} />}
      </div>
    );
  }
}
