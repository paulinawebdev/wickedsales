import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductListItem extends React.Component {

  render() {
    return (
      <div className="prod-card-container">
        <div className="prod-card">
          <Link to={`/product/${this.props.id}`}>
            <div className="prod-card-img">
              <img src={this.props.image} />
            </div>
            <div className="prod-card-info">
              <div className="prod-card-name">{this.props.name}</div>
              <div className="prod-card-price">${(this.props.price / 100).toFixed(2)}</div>
              <div className="prod-card-desc">{this.props.description}</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
