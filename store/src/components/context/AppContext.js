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
    currencyOutsideClick = () => {
        this.setState({
            ...this.context.state, currencyOpen: false
        });
    }
    cartOutsideClick = () => {
        this.setState({
            ...this.context.state, cartOpen: false
        });
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
    handleQuantity = (product, quantity) => {
        let newState = this.state.itemsInCart;
        newState = newState.filter((item) => {
            if (item.product.id === product.product.id && product.selectedAttributes === item.selectedAttributes) {
                if (item.quantity + quantity === 0) {
                    return undefined;
                }
                item.quantity += quantity;
                return item;
            }
            return item;
        })
        this.setState({ ...this.state, itemsInCart: newState }, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.itemsInCart))
        });
    }
    handleOrder = () => {
        this.setState({ ...this.state, itemsInCart: [] }, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.itemsInCart));
        });
    }
    addCartDefault = (product) => {
        const item = {
            product,
            quantity: 1,
            selectedAttributes: {}
        }
        product.attributes.map(attr => {
            const attrB = attr.items[0].value;
            item.selectedAttributes = {
                ...item.selectedAttributes, [attr.name]: attrB
            }
            return attr;
        })
        this.addToCart(item);
    }
    render() {
        const state = this.state;
        const {
            handleCurrencyClick, handleCurrencyChange,
            handleCartClick, addToCart, editProduct,
            handleQuantity, handleOrder, currencyOutsideClick,
            addCartDefault, cartOutsideClick
        } = this;

        return (
            <AppContext.Provider value={{
                state,
                handleCurrencyClick,
                handleCurrencyChange,
                handleCartClick,
                addToCart,
                editProduct,
                handleQuantity,
                addCartDefault,
                handleOrder,
                currencyOutsideClick,
                cartOutsideClick,
            }}>
                {this.props.children}
            </AppContext.Provider >
        )
    }
}
