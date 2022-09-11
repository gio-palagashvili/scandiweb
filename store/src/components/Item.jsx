import React, { Component } from "react";
import { AppContext } from "./context/AppContext";

class Item extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
  }
  render() {
    const style = {
      marginBottom: "-10%",
      marginLeft: "-20%",
      visibility: this.state.isHover ? "visible" : "hidden",
    };
    const box = {
      boxShadow: this.state.isHover
        ? "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        : "",
    };
    return (
      <div
        className={
          this.props.stock ? "category-item" : "category-item disabled-item"
        }
        style={box}
        onMouseOver={() => {
          this.setState({ isHover: true });
        }}
        onMouseOut={() => {
          this.setState({ isHover: false });
        }}
      >
        <div className="p-div">
          {!this.props.stock ? <h3 className="out-stock">OUT OF STOCK</h3> : ""}
          <img
            src={this.props.image}
            alt="imageexam"
            className="product-image"
          />
          <img
            src={require("../assets/icons/Item/circleCart.svg")}
            alt="add to cart"
            style={style}
            className="add-cart"
          />
          <h4>{this.props.name}</h4>
          <span>
            {this.props.prices.map((price, index) => {
              if (
                price.currency.symbol ===
                localStorage.getItem("currentCurrency")
              ) {
                return `${localStorage.getItem("currentCurrency")} 
                ${price.amount}`;
              }
            })}
          </span>
        </div>
      </div>
    );
  }
}

export default Item;
