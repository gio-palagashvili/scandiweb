import React, { Component } from "react";
import { Link } from "react-router-dom";
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
          <Link to={this.props.stock ? this.props.linked : ""}>
            {!this.props.stock ? (
              <h3 className="out-stock">OUT OF STOCK</h3>
            ) : (
              ""
            )}
            <img
              src={this.props.image}
              alt="imageexam"
              className="product-image"
            />
          </Link>
          <img
            src={require("../assets/icons/Item/circleCart.svg")}
            alt="add to cart"
            style={style}
            onClick={this.props.clicked}
            className="add-cart"
          />

          <Link to={this.props.stock ? this.props.linked : ""}>
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
          </Link>
        </div>
      </div>
    );
  }
}

export default Item;
