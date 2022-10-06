import React, { Component } from "react";
import { AppContext } from "../context/AppContext";

class Currency extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.currencyRef = React.createRef();
  }
  currhandler = (event) => {
    if (!this.currencyRef.current.contains(event.target)) {
      if (this.context.state.currencyOpen) {
        this.context.currencyOutsideClick();
      }
    }
  };
  componentDidMount = () => {
    document.addEventListener("mousedown", this.currhandler);
  };
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.currhandler);
  };
  render() {
    return (
      <div ref={this.currencyRef} className="refDiv">
        <a onClick={this.context.handleCurrencyClick} href>
          <h1>{localStorage.getItem("currentCurrency")}</h1>
          <img
            src={require("../../assets/icons/nav/arrow.svg")}
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
                  }}
                >
                  <a href>{curr}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Currency;
