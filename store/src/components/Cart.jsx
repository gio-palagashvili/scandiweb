import React, { Component } from "react";
import Nav from "./Nav";
import { AppContext } from "./context/AppContext";
import CartItem from "./CartItem";
import "../style/cart.css";

class Cart extends Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        <Nav categories={this.context.state.categories} />
        <div className="cart-wrapper">
          <h2 className="title">Cart</h2>
          <hr color="#E5E5E5" style={{ marginBottom: "2%", marginTop: "5%" }} />
          {this.context.state.itemsInCart.map((item, index) => {
            return <CartItem item={item} key={index} />;
          })}
        </div>
      </>
    );
  }
}

export default Cart;
