import React from 'react';

// import ProductDetails from './product-details';

export default class ProductListItem extends React.Component {

  render() {
    return (
      <div className="prod-card">
        <div className="prod-card-img">
          <img src={this.props.image} />
        </div>
        <div className="prod-card-info">
          <div className="prod-card-name">{this.props.name}</div>
          <div className="prod-card-price">${this.props.price}</div>
          <div className="prod-card-desc">{this.props.description}</div>
          {/* <ProductDetails id={this.props.key} /> */}
        </div>
      </div>
    );
  }
}
