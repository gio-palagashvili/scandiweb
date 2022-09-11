import { gql } from "@apollo/client";

export const LOAD_CURRENCY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;
export const LOAD_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;
export const LOAD_CATEGORY_ITEMS = gql`
  query($input: CategoryInput) {
    category(input: $input) {
      products {
        name
        id
        gallery
        inStock
        prices {
          currency {
            symbol
            label
          }
          amount
        }
      }
      name
    }
  }
`;
export const LOAD_ITEM_BY_ID = gql`
  query($productId: String!) {
    product(id: $productId) {
      brand
      id
      attributes {
        items {
          value
          displayValue
        }
        name
      }
      category
      description
      gallery
      name
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;