import React, { Component } from "react";

class Attribute extends Component {
  render() {
    return (
      <>
        <h3>{this.props.type.name}: </h3>
        <ul name="attribute">
          {this.props.type.items.map((item, index) => {
            const style = {
              backgroundColor: item.value,
            };
            if (this.props.type.name === "Color") {
              return (
                <li key={index}>
                  <button
                    value={item.value}
                    onClick={this.props.clicked}
                    name={this.props.type.name}
                    style={style}
                    className={
                      item.value === "#FFFFFF"
                        ? "bordered color-button"
                        : "color-button"
                    }
                    id={`${this.props.type.name}${index}`}
                  ></button>
                </li>
              );
            }
            return (
              <li key={index}>
                <button
                  value={item.value}
                  className="other-attr"
                  onClick={this.props.clicked}
                  name={this.props.type.name}
                  id={`${this.props.type.name}${index}`}
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

export default Attribute;
