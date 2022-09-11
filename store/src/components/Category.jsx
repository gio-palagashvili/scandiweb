import React, { Component } from "react";
import Item from "./Item";
import { LOAD_CATEGORY_ITEMS } from "./GraphQL/Queries";
import { Query } from "@apollo/client/react/components";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import "../style/category.css";
import { AppContext } from "./context/AppContext";

class Category extends Component {
  static contextType = AppContext;
  render() {
    return (
      <>
        <Nav
          category={this.props.category}
          categories={this.props.categories}
        />
        <div className="category-wrapper">
          <h1 className="category-title">{this.props.category}</h1>
          <div className="items-wrapper">
            <Query
              query={LOAD_CATEGORY_ITEMS}
              variables={{
                input: { title: this.props.category },
              }}
            >
              {({ loading, error, data }) => {
                if (loading) return "loading";
                const items = data.category.products;
                return items.map((item, index) => {
                  const prices = item.prices;

                  return (
                    <Link
                      key={index}
                      to={
                        item.inStock ? `/${data.category.name}/${item.id}` : ""
                      }
                    >
                      <Item
                        stock={item.inStock}
                        image={item.gallery[0]}
                        name={item.name}
                        prices={prices}
                      />
                    </Link>
                  );
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
