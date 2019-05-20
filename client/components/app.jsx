import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('api/products.php')
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    return (
      <div>
        <Header />
        <ProductList products={this.state.products} />
      </div>
    );
  }
}
