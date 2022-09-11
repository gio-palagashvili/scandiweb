import React from 'react'
import { client } from "./components/GraphQL/index";
import { LOAD_CATEGORIES } from "./components/GraphQL/Queries";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Category from "./components/Category";
import ItemDetail from './components/ItemDetail';
import Test from './components/Test';
import Cart from "./components/Cart"
import { AppProvider } from './components/context/AppContext';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }
  componentDidMount() {
    const { error, data } = client
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
  render() {

    return (
      <div className='main-wrapper'>
        <AppProvider >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/all" replace={true} />} />
              {this.state.categories.map((categoryName, index) => {
                return (
                  <Route path={categoryName} key={index} element={<Category
                    categories={this.state.categories}
                    category={categoryName}
                  />} />
                )
              })}
              <Route path="/:itemCategory/:id" element={<ItemDetail />} />
              <Route path="/test" element={<Test />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </div>
    )
  }
}
export default App; 