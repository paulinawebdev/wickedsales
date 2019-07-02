import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageSrc: this.props.image
    };
    this.imgChange = this.imgChange.bind(this);
  }

  imgChange() {
    if (this.state.imageSrc === this.props.image) {
      this.setState({ imageSrc: this.props.secImage });
    } else {
      this.setState({ imageSrc: this.props.image });
    }

  }

  render() {
    return (
      <div className="prod-card-container">
        <div className="prod-card" onMouseOver={this.imgChange} onMouseOut={this.imgChange}>
          <Link to={`/product/${this.props.id}`}>
            <div className="prod-card-img">
              <img src={this.state.imageSrc} />
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
