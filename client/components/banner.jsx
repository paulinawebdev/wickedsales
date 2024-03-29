import React from 'react';

export default class Banner extends React.Component {

  render() {
    var bannerStyle = {
      color: 'white',
      backgroundImage: 'url(' + this.props.image + ')'
    };
    return (
      <div className="banner-content" style={bannerStyle}>
        <div className="pg-width">
          <div className="banner-inner">
            <h1>Wicked Sales</h1>
            <p>Check Our Collection of Wicked Shirts</p>
          </div>
        </div>
      </div>
    );
  }
}
