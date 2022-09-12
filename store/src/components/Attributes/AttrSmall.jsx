import React, { Component } from "react";
import "../../style/attr.css";

class Attr extends Component {
  render() {
    return (
      <>
        <h4>{this.props.attr.name}: </h4>
        <ul name="attribute">
          {this.props.attr.items.map((item, index) => {
            const style = {
              backgroundColor: item.value,
            };
            if (this.props.attr.name === "Color") {
              return (
                <li key={index} className="no-hover">
                  <button
                    value={item.value}
                    className={
                      JSON.stringify(this.props.select).includes(
                        `"${this.props.attrName}":"${item.value}"`
                      )
                        ? "color-button color-button-selected"
                        : "color-button"
                    }
                    name={this.props.attr.name}
                    style={style}
                    id={`${this.props.attr.name}${index}`}
                  ></button>
                </li>
              );
            }
            return (
              <li key={index} className="no-hover">
                <button
                  value={item.value}
                  className={
                    JSON.stringify(this.props.select).includes(
                      `"${this.props.attrName}":"${item.value}"`
                    )
                      ? "selected other-attr"
                      : "other-attr"
                  }
                  name={this.props.attr.name}
                  id={`${this.props.attr.name}${index}`}
                >
                  {item.value}
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Attr;
