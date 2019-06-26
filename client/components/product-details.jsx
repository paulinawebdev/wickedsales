import React from 'react';
import Slider from 'react-slick';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: null,
      topImgSlider: null,
      bottomImgSlider: null,
      cartText: 'Add to Cart'
    };
    this.textChange = this.textChange.bind(this);
  }

  componentDidMount() {
    this.getData(this.props.id);
  }

  getData(id) {
    fetch('api/products.php?id=' + id)
      .then(res => res.json())
      .then(data => {
        this.setState({
          project: data,
          topImgSlider: this.slider1,
          bottomImgSlider: this.slider2
        });
      });
  }

  textChange(event) {

    event.target.disabled = true;
    this.setState({ cartText: 'Added!' });

    setTimeout(() => {
      this.setState({ cartText: 'Add to Cart' });
      event.target.disabled = false;
    }, 1000);
  }

  render() {
    let moreImages = null;
    let numOfImages = 0;

    const settings = {
      fade: true
    };

    if (this.state.project !== null) {

      if (this.state.project.url !== null) {
        numOfImages = this.state.project.url.length + 1;
        moreImages = this.state.project.url.map((productImg, index) => <div key={index}><img src={productImg}/></div>);
      }

    }

    return (
      <div className="pg-content">
        <div className="pg-width">
          <div className="back-btn" onClick={() => this.props.setViewCallback('catalog', {})}><i className="fas fa-chevron-left"></i> Back to Catalog</div>

          <div className="prod-detail">
            <div className="prod-detail-img">

              <Slider {...settings}
                asNavFor={this.state.bottomImgSlider}
                ref={slider => (this.slider1 = slider)}
              >
                <div>
                  <img src={this.state.project ? this.state.project.image : ''} />
                </div>
                {moreImages}

              </Slider>

              <Slider className="prod-detail-sm-img"
                asNavFor={this.state.topImgSlider}
                ref={slider => (this.slider2 = slider)}
                slidesToShow={numOfImages}
                swipeToSlide={true}
                focusOnSelect={true}
              >
                <div>
                  <img src={this.state.project ? this.state.project.image : ''} />
                </div>
                {moreImages}
              </Slider>

            </div>
            <div className="prod-detail-info">
              <h2>{this.state.project ? this.state.project.name : ''}</h2>
              <p>${this.state.project ? (this.state.project.price / 100).toFixed(2) : ''}</p>
              <p>{this.state.project ? this.state.project.shortDescription : ''}</p>
              <button className="btn btn-cart" onClick={() => {
                this.props.cartCallback(this.state.project);
                this.textChange(event);
              }
              }>{this.state.cartText}</button>
            </div>
            <div className="prod-detail-desc">
              <p>{this.state.project ? this.state.project.longDescription : ''}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
