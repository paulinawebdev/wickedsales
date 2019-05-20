import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {

  render() {
    const products = this.props.products;

    let productItems = products.map(productItem => <ProductListItem key={productItem.id} image={productItem.image} name={productItem.name} price={(productItem.price / 100).toFixed(2)} description={productItem.shortDescription} />);

    return (
      <div className="prod-list pg-width">
        {productItems}
      </div>
    );
  }
}
