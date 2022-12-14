import React, { Component } from "react";
import Attr from "./Attributes/Attr";
import { AppContext } from "./context/AppContext";

class CartItem extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  handleNextImage = () => {
    const len = this.props.item.product.gallery.length;
    if (this.state.index === len - 1) {
      this.setState({ ...this.state, index: 0 });
    } else {
      this.setState({ ...this.state, index: this.state.index + 1 });
    }
  };
  handlePrevImage = () => {
    const len = this.props.item.product.gallery.length;
    if (this.state.index - 1 === -1) {
      this.setState({ ...this.state, index: len - 1 });
    } else {
      this.setState({ ...this.state, index: this.state.index - 1 });
    }
  };
  handleQuantityClick = (quantity) => {
    this.context.handleQuantity(this.props.item, quantity);
  };
  render() {
    return (
      <>
        <div className="item-wrapper">
          <div className="details">
            <h2>{this.props.item.product.name.split(" ")[0]}</h2>
            <h2 className="sup">
              {
                this.props.item.product.name.split(
                  this.props.item.product.name.split(" ")[0]
                )[1]
              }
            </h2>
            <h3 className="prices">
              {this.props.item.product.prices.map((price, index) => {
                if (
                  price.currency.symbol ===
                  localStorage.getItem("currentCurrency")
                ) {
                  return `${localStorage.getItem("currentCurrency")}${
                    price.amount
                  }`;
                }
                return undefined;
              })}
            </h3>
            <div className="attr">
              {this.props.item.product.attributes.map((attr, index) => {
                return (
                  <Attr
                    attr={attr}
                    attrName={attr.name}
                    select={this.props.item.selectedAttributes}
                    key={index}
                  />
                );
              })}
            </div>
          </div>

          <div className="gallery">
            <div className="quantity">
              <div className="plus">
                <button
                  className="increment"
                  onClick={() => {
                    this.handleQuantityClick(1);
                  }}
                >
                  +
                </button>
              </div>
              <div className="number">{this.props.item.quantity}</div>
              <div className="minus">
                <button
                  className="increment"
                  onClick={() => {
                    this.handleQuantityClick(-1);
                  }}
                >
                  -
                </button>
              </div>
            </div>
            <div className="image">
              <img
                src={this.props.item.product.gallery[this.state.index]}
                alt="cultural"
              />
              {this.props.item.product.gallery.length > 1 ? (
                <div className="arrows">
                  <button onClick={this.handlePrevImage}>
                    <i class="arrow left"></i>
                  </button>
                  <button onClick={this.handleNextImage}>
                    <i class="arrow right"></i>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <hr color="#E5E5E5" />
      </>
    );
  }
}

export default CartItem;
