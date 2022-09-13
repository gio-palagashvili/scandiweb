import { canonicalStringify } from "@apollo/client/cache";
import React, { Component } from "react";
import "../style/navbar.css";
import { AppContext } from "./context/AppContext";
import MiniCart from "./MiniCart";

class Nav extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.currencyRef = React.createRef();
    this.cartRef = React.createRef();
  }
  handler = (event) => {
    if (this.cartRef.current && !this.cartRef.current.contains(event.target)) {
      this.context.cartOutsideClick();
    } else {
      console.log("s");
    }
  };
  componentDidMount = () => {
    document.addEventListener("mousedown", this.handler);
  };
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handler);
  };
  render() {
    return (
      <>
        <div className="nav-wrapper">
          <div className="text">
            <ul>
              {this.props.categories.map((category, index) => {
                if (window.location.href.split("/")[3] === category) {
                  return (
                    <li className="focussed" key={index}>
                      <a href={"/" + category}>{category}</a>
                    </li>
                  );
                }
                return (
                  <li className="" key={index}>
                    <a href={"/" + category}>{category}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="logo">
            <img
              src={require("../assets/icons/nav/navCenterLogo.svg")}
              alt="icon"
            />
          </div>
          <div className="cart-div">
            <a onMouseDown={this.context.handleCurrencyClick}>
              <h1>{localStorage.getItem("currentCurrency")}</h1>
              <img
                src={require("../assets/icons/nav/arrow.svg")}
                alt="icon"
                className={
                  this.context.state.currencyOpen ? "arrowRotated" : "arrow"
                }
              />
            </a>
            <div
              className={
                this.context.state.currencyOpen ? "currency-div" : "closed"
              }
              ref={this.currencyRef}
            >
              <ul>
                {this.context.state.currencies.map((curr, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        this.context.handleCurrencyChange(curr.split(" ")[0]);
                      }}
                    >
                      <a>{curr}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <a className="cartIcon" onMouseDown={this.context.handleCartClick}>
              <img
                src={require("../assets/icons/nav/EmptyCart.svg")}
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
          </div>
        </div>
        {this.context.state.cartOpen ? <MiniCart /> : ""}
      </>
    );
  }
}

export default Nav;
