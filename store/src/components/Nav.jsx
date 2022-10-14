import React, { Component } from "react";
import "../style/navbar.css";
import { AppContext } from "./context/AppContext";
import CartNav from "./NavItems/CartNav";
import Currency from "./NavItems/Currency";

class Nav extends Component {
  static contextType = AppContext;

  render() {
    return (
      <>
        <div className="nav-wrapper">
          <div className="text">
            <ul>
              {this.props.categories.map((category, index) => {
                if (this.context.state.currCategory === category) {
                  return (
                    <li
                      className="focussed"
                      key={index}
                      onClick={() => this.context.setCategory(category)}
                    >
                      <a
                        href={
                          window.location.href.split("/").length > 4 ||
                          window.location.href.includes("cart")
                            ? "/"
                            : null
                        }
                      >
                        {category}
                      </a>
                    </li>
                  );
                }
                return (
                  <li
                    className=""
                    key={index}
                    onClick={() => this.context.setCategory(category)}
                  >
                    <a
                      href={
                        window.location.href.split("/").length > 4 ||
                        window.location.href.includes("cart")
                          ? "/"
                          : null
                      }
                    >
                      {category}
                    </a>
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
            <Currency />
            <CartNav />
          </div>
        </div>
      </>
    );
  }
}

export default Nav;
