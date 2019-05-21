import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.handleDetails = this.handleDetails.bind(this);
  }

  handleDetails(id) {
    let paramObject = { id: id };
    this.props.setViewCallback('details', paramObject);
  }

  render() {
    const products = this.props.products;

    let productItems = products.map(productItem => <ProductListItem handleDetails={ () => this.handleDetails(productItem.id)} key={productItem.id} image={productItem.image} name={productItem.name} price={productItem.price} description={productItem.shortDescription} />);

    return (
      <div className="prod-list pg-width">
        {productItems}
      </div>
    );
  }
}
