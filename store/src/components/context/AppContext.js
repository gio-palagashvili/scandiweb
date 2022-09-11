import React, { Component } from 'react';
import { client } from "../GraphQL/index";
import { LOAD_CATEGORIES } from "../GraphQL/Queries";
import { LOAD_CURRENCY } from "../GraphQL/Queries";
export const AppContext = React.createContext();

export class AppProvider extends Component {
    constructor() {
        super();
        client
            .query({
                query: LOAD_CATEGORIES,
            })
            .then((x) => {
                this.setState({
                    ...this.state,
                    categories: x.data.categories.map((c) => {
                        return c.name;
                    }),
                });
            });
    }
    state = {
        currencyOpen: false,
        cartOpen: false,
        categories: [],
        currencies: [],
        currentCurrency: (localStorage.getItem("currentCurrency")) ?
            localStorage.getItem("currentCurrency") : localStorage.setItem("currentCurrency", "$"),
        itemsInCart: (localStorage.getItem("cart")) ?
            JSON.parse(localStorage.getItem("cart")) : [],
    }
    componentDidMount = () => {
        client.query({
            query: LOAD_CURRENCY
        }).then((x) => {
            this.setState({
                ...this.state,
                currencies: x.data.currencies.map((c) => {
                    return `${c.symbol} ${c.label}`
                })
            });
        })
    }
    handleCartClick = () => {
        this.setState({ ...this.state, cartOpen: !this.state.cartOpen });
    }
    handleCurrencyClick = () => {
        this.setState({ ...this.state, currencyOpen: !this.state.currencyOpen });
    }
    handleCurrencyChange = (currency) => {
        localStorage.setItem("currentCurrency", currency);
        this.setState({ ...this.state, currentCurrency: currency });
        this.handleCurrencyClick();
    }
    addToCart = (product) => {
        const check = this.state.itemsInCart.find((item) => (item.productId === product.productId &&
            JSON.stringify(item.selectedAttributes) === JSON.stringify(product.selectedAttributes)));
        if (check) {
            let newCart = this.state.itemsInCart;
            newCart = newCart.map((item) => {
                if (JSON.stringify(item.selectedAttributes) === JSON.stringify(product.selectedAttributes)) {
                    console.log(item)
                    item.quantity = item.quantity + 1
                }
                return item;
            })
            this.setState({ ...this.state, itemsInCart: newCart }, () => {
                localStorage.setItem("cart", JSON.stringify(this.state.itemsInCart));
            });
        } else {
            product.quantity = 1;
            this.setState({ ...this.state, itemsInCart: [...this.state.itemsInCart, product] }, () => {
                localStorage.setItem("cart", JSON.stringify(this.state.itemsInCart));
            });
        }
    }
    editProduct = (productId, attrs) => {
        let newState = this.state.itemsInCart;
        newState = newState.map((item) => {
            if (item.product.id === productId) {
                item.selectedAttributes = attrs;
                return item;
            }
            return item;
        })
        this.setState({ ...this.state, itemsInCart: newState }, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.itemsInCart))
        });
    }
    handleQuantity = (productId, quantity) => {
        let newState = this.state.itemsInCart;
        newState = newState.map((item) => {
            if (item.product.id === productId) {
                console.log(item)
                item.quantity += quantity;
                return item;
            }
            return item;
        })
        this.setState({ ...this.state, itemsInCart: newState }, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.itemsInCart))
        });
    }
    render() {
        const state = this.state;
        const { handleCurrencyClick, handleCurrencyChange, handleCartClick, addToCart, editProduct, handleQuantity } = this;

        return (
            <AppContext.Provider value={{
                state,
                handleCurrencyClick,
                handleCurrencyChange,
                handleCartClick,
                addToCart,
                editProduct,
                handleQuantity,
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
