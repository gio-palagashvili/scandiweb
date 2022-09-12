import React, { Component } from "react";
import Nav from "./Nav";
import { LOAD_ITEM_BY_ID } from "./GraphQL/Queries";
import { Query } from "@apollo/client/react/components";
import "../style/itemDetail.css";
import Attribute from "./Attributes/Attribute";
import { AppContext } from "./context/AppContext";

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
      if (element.classList.contains("selected")) {
        element.classList.remove("selected");
      }
    });
    element.classList.add("selected");

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
    if (!this.state.attr) {
      this.setState({ ...this.state, error: "must select an attribute" });
    } else {
      this.setState({ ...this.state, error: "" });

      this.context.addToCart(this.state.product);
      this.setState({ ...this.state, error: "" });

      this.setState({
        ...this.state,
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
                      <img
                        alt=""
                        src={image}
                        key={index}
                        onClick={() => this.changeMain(index)}
                      />
                    );
                  })}
                </div>
                <div className="main-image">
                  <img src={item.gallery[this.state.acitveIndex]} alt="" />
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
                      {prices.map((price, index) => {
                        if (
                          price.currency.symbol ===
                          localStorage.getItem("currentCurrency")
                        ) {
                          return `${localStorage.getItem("currentCurrency")}${
                            price.amount
                          }`;
                        }
                      })}
                    </h3>
                    <p>{this.state.error}</p>
                    <p>
                      {this.state.message
                        ? `${this.state.message} x ${this.state.messNumber}`
                        : ""}
                    </p>

                    <button onClick={this.checkItem.bind(this)}>
                      Add to Cart
                    </button>

                    <p
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></p>
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
