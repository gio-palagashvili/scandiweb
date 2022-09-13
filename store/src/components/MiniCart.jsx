import React, { Component } from "react";
import MiniCartItem from "./MiniCartItem";
import "../style/miniCart.css";
import { AppContext } from "./context/AppContext";

class MiniCart extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.cartRef = React.createRef();
  }
  cartHandler = (event) => {
    if (this.cartRef.current && !this.cartRef.current.contains(event.target)) {
      this.context.cartOutsideClick();
    }
  };
  componentDidMount = () => {
    document.addEventListener("mousedown", this.cartHandler);
  };

  render() {
    return (
      <div className="mini-cart-overlay">
        <div className="mini-cart-wrapper" ref={this.cartRef}>
          <h3 className="bag">
            My Bag,{" "}
            <span>
              {this.context.state.itemsInCart.reduce((acc, item) => {
                return acc + item.quantity;
              }, 0)}{" "}
              items
            </span>
          </h3>
          {this.context.state.itemsInCart.map((item, index) => {
            return <MiniCartItem item={item} key={index} />;
          })}
          <div className="buttons">
            <p>
              Total :
              <span>
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
              </span>
            </p>

            <a href="/cart">
              <button className="view">view bag</button>
            </a>
            <button onClick={this.context.handleOrder}>check out</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniCart;
