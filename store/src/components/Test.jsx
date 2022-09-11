import React, { Component } from "react";
import { AppContext } from "./context/AppContext";

class Test extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button></button>
        <button></button>
      </div>
    );
  }
}

export default Test;
