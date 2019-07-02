import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: null,
      topImgSlider: null,
      bottomImgSlider: null,
      cartText: 'Add to Cart',
      quantity: 1,
      quantityError: false
    };
    this.textChange = this.textChange.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.checkQuantity = this.checkQuantity.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getData(this.props.match.params.id);
  }

  getData(id) {
    fetch('/api/products.php?id=' + id)
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

  toggleAccordion(event) {
    if (event.target.nextElementSibling.className === 'accordion-item active') {
      event.target.className = 'accordion-btn';
      event.target.nextElementSibling.className = 'accordion-item';
    } else {
      event.target.className = 'accordion-btn active';
      event.target.nextElementSibling.className = 'accordion-item active';
    }
  }

  checkQuantity(event) {
    this.setState({ quantity: event.target.value });
    if (isNaN(event.target.value) || (event.target.value > 100)) {
      this.setState({ quantityError: true });
    } else {
      this.setState({ quantityError: false });
    }
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
        moreImages = this.state.project.url.map((productImg, index) => <div className="slide-img" key={index}><img src={productImg}/></div>);
      }
    }

    return (
      <div className="pg-content">
        <div className="pg-width">
          <div className="back-btn"><Link to="/"><i className="fas fa-chevron-left"></i> Back to Catalog</Link></div>

          <div className="prod-detail">
            <div className="prod-detail-img">

              <Slider {...settings}
                asNavFor={this.state.bottomImgSlider}
                ref={slider => (this.slider1 = slider)}
              >
                <div className="slide-img">
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
                <div className="slide-img">
                  <img src={this.state.project ? this.state.project.image : ''} />
                </div>
                {moreImages}
              </Slider>

            </div>
            <div className="prod-detail-info">
              <h2>{this.state.project ? this.state.project.name : ''}</h2>
              <p>${this.state.project ? (this.state.project.price / 100).toFixed(2) : ''}</p>
              <p>{this.state.project ? this.state.project.shortDescription : ''}</p>
              <div className="prod-detail-cart">
                <span className="cart-quantity">
                  <input type="text" value={this.state.quantity} onChange={this.checkQuantity} />
                </span>
                <button className="btn btn-cart" onClick={() => {
                  this.props.cartCallback(this.state.project, this.state.quantity);
                  this.textChange(event);
                }
                }>{this.state.cartText}</button>
                {this.state.quantityError ? <p className="error-msg">Must input number &amp; be under 100 quantity</p> : ''}
              </div>

              <div className="prod-detail-desc accordion">
                <div className="accordion-btn active" onClick={this.toggleAccordion}>Product Details</div>
                <div className="accordion-item active">
                  <p>{this.state.project ? this.state.project.longDescription : ''}</p>
                  <ul>
                    <li>50% cotton</li>
                    <li>50% polyester</li>
                    <li>Wash cold, dry low</li>
                    <li>Imported</li>
                    <li>Model wears size Medium</li>
                  </ul>
                </div>
                <div className="accordion-btn" onClick={this.toggleAccordion}>Product Sizing</div>
                <div className="accordion-item">
                  <table className="accordion-size-guide" align="center" border="1" bordercolor="#CCCCCC" cellPadding="1" cellSpacing="0" width="90%">
                    <tbody>
                      <tr>
                        <td bgcolor="#CCCCCC" colSpan="6"><b>Girl Sizes</b></td>
                      </tr>
                      <tr bgcolor="#F4F4F4">
                        <td width="20%"><b>US</b></td>
                        <td><b>UK</b></td>
                        <td><b>EU</b></td>
                        <td width="20%"><b>BUST</b></td>
                        <td width="20%"><b>WAIST</b></td>
                        <td width="20%"><b>LOW HIP</b></td>
                      </tr>
                      <tr>
                        <td rowSpan="2">XS</td>
                        <td>0</td>
                        <td width="10%" rowSpan="2">6</td>
                        <td>32&quot;</td>
                        <td>24&quot;</td>
                        <td>35&quot;</td>
                      </tr>
                      <tr>
                        <td width="10%">1</td>
                        <td>32&quot;</td>
                        <td>25&quot;</td>
                        <td>36&quot;</td>
                      </tr>
                      <tr>
                        <td rowSpan="2">SM</td>
                        <td height="18">3</td>
                        <td>8</td>
                        <td>33&quot;</td>
                        <td>26&quot;</td>
                        <td>37&quot;</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>10</td>
                        <td>34&quot;</td>
                        <td>27&quot;</td>
                        <td>38&quot;</td>
                      </tr>
                      <tr>
                        <td rowSpan="2">MD</td>
                        <td>7</td>
                        <td>12</td>
                        <td>36&quot;</td>
                        <td>28&quot;</td>
                        <td>39&quot;</td>
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>14</td>
                        <td>37&quot;</td>
                        <td>29&quot;</td>
                        <td>40&quot;</td>
                      </tr>
                      <tr>
                        <td rowSpan="2">L</td>
                        <td>11</td>
                        <td>16</td>
                        <td>38&quot;</td>
                        <td>30.5&quot;</td>
                        <td>41.5&quot;</td>
                      </tr>
                      <tr>
                        <td>13</td>
                        <td>18</td>
                        <td>39&quot;</td>
                        <td>32&quot;</td>
                        <td>43&quot;</td>
                      </tr>
                      <tr>
                        <td rowSpan="2">XL</td>
                        <td>15</td>
                        <td>20</td>
                        <td>40&quot;</td>
                        <td>33.5&quot;</td>
                        <td>44.5&quot;</td>
                      </tr>
                      <tr>
                        <td>17</td>
                        <td>22</td>
                        <td>41.5&quot;</td>
                        <td>35&quot;</td>
                        <td>46&quot;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
