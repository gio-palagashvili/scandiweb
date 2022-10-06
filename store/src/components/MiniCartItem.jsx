import React, { Component } from "react";
import AttrSmall from "./Attributes/AttrSmall";
import { AppContext } from "./context/AppContext";

class MiniCartItem extends Component {
  static contextType = AppContext;
  handleQuantityClick = (quantity) => {
    this.context.handleQuantity(this.props.item, quantity);
  };
  render() {
    return (
      <div className="mini-cart-item">
        <div className="text-section">
          <h3>{this.props.item.product.name.split(" ")[0]}</h3>
          <h3>
            {
              this.props.item.product.name.split(
                this.props.item.product.name.split(" ")[0]
              )[1]
            }
          </h3>
          <h4 className="price">
            {this.props.item.product.prices.map((price) => {
              if (
                price.currency.symbol !==
                localStorage.getItem("currentCurrency")
              ) {
                return undefined;
              }
              return `${localStorage.getItem("currentCurrency")}${
                price.amount
              }`;
            })}
          </h4>
          <div className="attr">
            {this.props.item.product.attributes.map((attr, index) => {
              return (
                <AttrSmall
                  attr={attr}
                  attrName={attr.name}
                  select={this.props.item.selectedAttributes}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className="increment-section">
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
        <div className="pictures-section">
          <img src={this.props.item.product.gallery[0]} alt="product" />
        </div>
      </div>
    );
  }
}

export default MiniCartItem;
