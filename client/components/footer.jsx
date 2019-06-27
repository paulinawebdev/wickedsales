import React from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className="pg-width">
          <div className="footer-content">
            <div className="logo"><Link to="/"><h1><i className="fas fa-bolt"></i> Wicked Sales</h1></Link></div>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
