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
      }
    };

    this.setView = this.setView.bind(this);

  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('api/products.php')
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
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
        <Header />
        {this.state.view.name === 'catalog' ? <ProductList products={this.state.products} setViewCallback={this.setView} /> : <ProductDetails backCallback={this.setView} id={this.state.view.params.id} />}
      </div>
    );
  }
}
