import React, { Component } from "react";
import "../style/navbar.css";
import { AppContext } from "./context/AppContext";
import MiniCart from "./MiniCart";

class Nav extends Component {
  static contextType = AppContext;

  render() {
    return (
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
          <a onClick={this.context.handleCurrencyClick} href>
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
          >
            <ul>
              {this.context.state.currencies.map((curr, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      this.context.handleCurrencyChange(curr.split(" ")[0]);
                      this.setState({ random: "1" });
                    }}
                  >
                    <a>{curr}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <a className="cartIcon" onClick={this.context.handleCartClick}>
            <img
              src={require("../assets/icons/nav/EmptyCart.svg")}
              alt="icon"
            />
          </a>
          {this.context.state.cartOpen ? <MiniCart /> : ""}
        </div>
      </div>
    );
  }
}

export default Nav;
