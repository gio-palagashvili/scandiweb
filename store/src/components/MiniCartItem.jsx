import React, { Component } from "react";

class MiniCartItem extends Component {
  render() {
    return (
      <div className="mini-cart-item">
        <div className="text-section">
          <h4>Apollo Running Shiry</h4>
          <span>$50.00</span>
        </div>
        <div className="increment-section"></div>
        <div className="pictures-section"></div>
      </div>
    );
  }
}

export default MiniCartItem;
