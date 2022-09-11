import React, { Component } from "react";
import MiniCartItem from "./MiniCartItem";
import "../style/miniCart.css";
import { Query } from "@apollo/client/react/components";
import { LOAD_ITEM_BY_ID } from "./GraphQL/Queries";

class MiniCart extends Component {
  render() {
    return (
      <div className="mini-cart-wrapper">
        <h3>My Bag, 3 items</h3>
        <MiniCartItem />
      </div>
    );
  }
}

export default MiniCart;
