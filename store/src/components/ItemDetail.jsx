import React, { Component } from "react";
import Nav from "./Nav";
import { LOAD_ITEM_BY_ID } from "./GraphQL/Queries";
import { Query } from "@apollo/client/react/components";
import "../style/itemDetail.css";
import Attribute from "./Attributes/Attribute";
import { AppContext } from "./context/AppContext";
import parser from "html-react-parser";

class ItemDetail extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      acitveIndex: 0,
      message: "",
      messNumber: 0,
      attr: null,
      error: "",
      itemId: "",
      product: {
        quantity: 1,
        selectedAttributes: {},
      },
    };
  }
  componentDidMount() {
    const id = window.location.href.split("/").pop();
    this.setState({ ...this.state, itemId: id });
  }
  changeMain = (index) => {
    this.setState({ ...this.state, acitveIndex: index });
  };
  handleAttributeClick = (key) => {
    const element = document.getElementById(key.target.id);
    document.getElementsByName(key.target.name).forEach((element) => {
      if (
        element.classList.contains("selected") ||
        element.classList.contains("color-button-selected")
      ) {
        if (element.value === "#FFFFFF") element.classList.add("bordered");

        element.classList.remove("color-button-selected");
        element.classList.remove("selected");
      }
    });
    if (element.classList.contains("color-button")) {
      if (element.value === "#FFFFFF") element.classList.remove("bordered");
      element.classList.add("color-button-selected");
    } else {
      element.classList.add("selected");
    }

    this.setState({
      ...this.state,
      attr: "x",
      product: {
        ...this.state.product,
        selectedAttributes: {
          ...this.state.product.selectedAttributes,
          [key.target.name]: key.target.value,
        },
      },
    });
  };
  checkItem() {
    if (
      document.getElementsByClassName("selected").length !==
      this.state.product.product.attributes.length
    ) {
      this.setState({
        ...this.state,
        error: "no attribute can remain unselected",
      });
    } else {
      this.context.addToCart(this.state.product);

      this.setState({
        ...this.state,
        error: "",
        message: "item added to cart",
        messNumber: this.state.messNumber + 1,
      });
    }
  }

  render() {
    return (
      <>
        <Nav category="all" categories={this.context.state.categories} />
        <Query
          query={LOAD_ITEM_BY_ID}
          variables={{
            productId: this.state.itemId,
          }}
          onCompleted={(data) => {
            const product = data.product;
            this.setState({
              ...this.state,
              product: { ...this.state.product, product },
            });
          }}
        >
          {({ loading, data }) => {
            if (loading) return "loading";
            const item = data.product;
            const gallery = item.gallery;
            const prices = item.prices;
            return (
              <div className="detail-container">
                <div className="carussel">
                  {gallery.map((image, index) => {
                    return (
                      <div key={index} className="cover">
                        <img
                          alt=""
                          src={image}
                          onClick={() => this.changeMain(index)}
                          className={!item.inStock ? "no-stock" : ""}
                        />
                        {!item.inStock ? (
                          <span
                            className="no-stock-small"
                            onClick={() => this.changeMain(index)}
                          >
                            OUT OF STOCK
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="main-image">
                  <img
                    src={item.gallery[this.state.acitveIndex]}
                    alt=""
                    className={!item.inStock ? "no-stock" : ""}
                  />
                  {!item.inStock ? (
                    <h1 className="no-stock-big">OUT OF STOCK</h1>
                  ) : (
                    ""
                  )}
                </div>
                <div className="details">
                  <div>
                    {item.name.split(" ").length > 2 ? (
                      <>
                        <h1>{item.name.split(" ")[0]}</h1>
                        <h2 className="sup">
                          {item.name.split(item.name.split(" ")[0])[1]}
                        </h2>
                      </>
                    ) : (
                      <h1>{item.name}</h1>
                    )}
                  </div>
                  <div className="attr">
                    {item.attributes.map((attr, index) => {
                      return (
                        <Attribute
                          type={attr}
                          key={index}
                          clicked={(event) => {
                            this.handleAttributeClick(event);
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="price">
                    <h4>price:</h4>
                    <h3>
                      {prices.map((price) => {
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
                    </h3>
                    {this.state.error ? <p>{this.state.error}</p> : null}
                    {this.state.message ? (
                      <p>
                        {`${this.state.message} x ${this.state.messNumber}`}
                      </p>
                    ) : null}

                    <button
                      onClick={item.inStock ? this.checkItem.bind(this) : null}
                      className={item.inStock ? "" : "out-of-stock"}
                    >
                      {item.inStock ? "Add to cart" : "Out of stock"}
                    </button>

                    {item.description.includes("<") ? (
                      parser(item.description)
                    ) : (
                      <p>{parser(item.description)}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}

export default ItemDetail;
