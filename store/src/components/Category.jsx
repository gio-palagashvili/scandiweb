import React, { Component } from "react";
import Item from "./Item";
import Nav from "./Nav";
import "../style/category.css";
import { AppContext } from "./context/AppContext";
import { client } from "./GraphQL/index";
import { GET_ALL_BY_CATEGORY } from "./GraphQL/Queries";

class Category extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
    };
  }
  handldeAddCartDefault = (item) => {
    this.context.addCartDefault(item);
  };
  componentDidMount = () => {
    client
      .query({
        query: GET_ALL_BY_CATEGORY,
        input: {
          title: "all",
        },
      })
      .then((data) => {
        this.setState({
          ...this.state,
          allItems: data.data.category.products,
        });
      });
  };
  render() {
    return (
      <>
        <Nav categories={this.props.categories} />
        <div className="category-wrapper">
          <h1 className="category-title">{this.context.state.currCategory}</h1>
          <div className="items-wrapper">
            {this.state.allItems.map((item, index) => {
              const prices = item.prices;
              if (
                item.category !== this.context.state.currCategory &&
                this.context.state.currCategory !== "all"
              ) {
                return null;
              }
              return (
                <Item
                  key={index}
                  stock={item.inStock}
                  image={item.gallery[0]}
                  name={item.name}
                  linked={`/${item.category}/${item.id}`}
                  clicked={() => this.handldeAddCartDefault(item)}
                  prices={prices}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Category;
