import React, { Component } from "react";
import Item from "./Item";
import { LOAD_CATEGORY_ITEMS } from "./GraphQL/Queries";
import { Query } from "@apollo/client/react/components";
import Nav from "./Nav";
import "../style/category.css";
import { AppContext } from "./context/AppContext";

class Category extends Component {
  static contextType = AppContext;
  handldeAddCartDefault = (item) => {
    this.context.addCartDefault(item);
  };
  render() {
    return (
      <>
        <Nav categories={this.props.categories} />
        <div className="category-wrapper">
          <h1 className="category-title">{this.context.state.currCategory}</h1>
          <div className="items-wrapper">
            <Query
              query={LOAD_CATEGORY_ITEMS}
              variables={{
                input: { title: this.context.state.currCategory },
              }}
            >
              {({ loading, error, data }) => {
                if (loading) return "loading";
                const items = data.category.products;
                return items.map((item, index) => {
                  const prices = item.prices;
                  if (data.category.name === this.context.state.currCategory) {
                    return (
                      <Item
                        key={index}
                        stock={item.inStock}
                        image={item.gallery[0]}
                        name={item.name}
                        linked={`/${data.category.name}/${item.id}`}
                        clicked={() => this.handldeAddCartDefault(item)}
                        prices={prices}
                      />
                    );
                  }
                  return null;
                });
              }}
            </Query>
          </div>
        </div>
      </>
    );
  }
}

export default Category;
