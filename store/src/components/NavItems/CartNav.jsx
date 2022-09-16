import React, { Component } from "react";
import MiniCart from "../MiniCart";
import { AppContext } from "../context/AppContext";

class CartNav extends Component {
  static contextType = AppContext;
  render() {
    return (
      <>
        <a className="cartIcon" onClick={this.context.handleCartClick}>
          <img
            src={require("../../assets/icons/nav/EmptyCart.svg")}
            alt="icon"
          />
          {this.context.state.itemsInCart.length > 0 ? (
            <div className="circle">
              {this.context.state.itemsInCart.reduce((acc, item) => {
                return acc + item.quantity;
              }, 0)}
            </div>
          ) : (
            ""
          )}
        </a>
        {this.context.state.cartOpen ? <MiniCart /> : ""}
      </>
    );
  }
}

export default CartNav;
