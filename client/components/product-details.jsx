import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      image: null,
      longDesc: null,
      name: null,
      price: null,
      shortDesc: null
    };
  }

  componentDidMount() {
    this.getData(this.props.id);
  }

  getData(id) {
    fetch('api/products.php?id=' + { id })
      .then(res => res.json())
      .then(data => this.setState({
        id: data.id,
        image: data.image,
        longDesc: data.longDescription,
        name: data.name,
        price: data.price,
        shortDesc: data.shortDescription
      }));
  }

  render() {
    return (

      <div className="pg-width">
        <div className="back-btn" onClick={() => this.props.backCallback('catalog', {})}><i className="fas fa-chevron-left"></i> Back to Catalog</div>

        <div className="prod-detail">
          <div className="prod-detail-img"><img src={this.state.image} /></div>
          <div className="prod-detail-info">
            <h2>{this.state.name}</h2>
            <p>{(this.state.price / 100).toFixed(2)}</p>
            <p>{this.state.shortDesc}</p>
          </div>
          <div className="prod-detail-desc">
            <p>{this.state.longDesc}</p>
          </div>
        </div>
      </div>

    );
  }
}
