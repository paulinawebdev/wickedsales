import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null
    };
  }

  componentDidMount() {
    this.getData(this.props.id);
  }

  getData(id) {
    fetch('api/products?id=' + { id })
      .then(res => res.json())
      .then(data => this.setState({ product: data }));
  }

  render() {
    return (
      <div className="prod-details">
        {this.state.product}
      </div>
    );
  }
}
