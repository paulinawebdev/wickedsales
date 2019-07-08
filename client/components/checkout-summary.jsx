import React from 'react';
import { Link } from 'react-router-dom';

export default class CheckoutSummary extends React.Component {

  render() {
    return (
        <div className="pg-content">
            <div className="pg-width">
                <div className="back-btn"><Link to="/"><i className="fas fa-chevron-left"></i> Back to Catalog</Link></div>
                <div className="checkout-summary">
                    <h2>Your Order has been placed!</h2>
                    <div className="checkout-info">
                        <p>Thank you for placing your order. After your payment is verifed, your items will be shipped immediately.</p>
                        <Link to="/" className="btn">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
