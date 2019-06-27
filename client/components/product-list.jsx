import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.handleDetails = this.handleDetails.bind(this);
  }

  handleDetails(productItem) {
    let prodId = productItem.id;
    this.props.projIdCallback(prodId);
  }

  render() {
    const products = this.props.products;

    let productItems = products.map(productItem => <ProductListItem handleDetails={ () => this.handleDetails(productItem)} key={productItem.id} id={productItem.id} image={productItem.image} name={productItem.name} price={productItem.price} description={productItem.shortDescription} />);

    return (
      <div className="pg-content">
        <div className="pg-width">
          <h1 className="pg-title">Pin Collection</h1>
          <div className="prod-list">
            {productItems}
          </div>
        </div>
      </div>
    );
  }
}
