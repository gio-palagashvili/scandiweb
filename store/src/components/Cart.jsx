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
          {this.context.state.itemsInCart.length === 0 ? (
            <h1 className="empty">your cart is empty</h1>
          ) : (
            ""
          )}

          {this.context.state.itemsInCart.map((item, index) => {
            return <CartItem item={item} key={index} />;
          })}
          <div className="payment">
            <div className="keys">
              <h3>Tax 21%:</h3>
              <h3>Quantity:</h3>
              <h3>Total:</h3>
            </div>
            <div className="values">
              <p>
                {localStorage.getItem("currentCurrency")}
                {Math.round(
                  this.context.state.itemsInCart.reduce((acc, item) => {
                    const itemPrice =
                      item.product.prices.find(
                        (price) =>
                          price.currency.symbol ===
                          localStorage.getItem("currentCurrency")
                      ).amount * item.quantity;
                    return acc + itemPrice;
                  }, 0) *
                    (21 / 100) *
                    10
                ) / 10}
              </p>
              <p>
                {this.context.state.itemsInCart.reduce((acc, item) => {
                  return acc + item.quantity;
                }, 0)}
              </p>
              <p>
                {localStorage.getItem("currentCurrency")}
                {Math.round(
                  this.context.state.itemsInCart.reduce((acc, item) => {
                    const itemPrice =
                      item.product.prices.find(
                        (price) =>
                          price.currency.symbol ===
                          localStorage.getItem("currentCurrency")
                      ).amount * item.quantity;
                    return acc + itemPrice;
                  }, 0) * 10
                ) / 10}
              </p>
            </div>
          </div>
          {this.context.state.itemsInCart.length > 0 ? (
            <button
              className="order"
              onClick={() => {
                this.context.handleOrder();
              }}
            >
              Order
            </button>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default Cart;
