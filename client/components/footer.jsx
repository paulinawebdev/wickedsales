import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className="pg-width">
          <div className="footer-content">
            <div className="logo"><h1><i className="fas fa-bolt"></i> Wicked Sales</h1></div>
            <div className="footer-links">
              <a href="#" onClick={() => this.props.setViewCallback('catalog', {})}>Home</a>
              <a href="#" onClick={() => this.props.setViewCallback('cart', {})}>Cart</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
