import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import PLP from './components/PLP'
import './styles/global.scss'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { client } from './index'
import { gql } from '@apollo/client'
import PDP from './components/PDP'
import Cart from './components/Cart'


import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()
    this.state={
      categories: [],
      title: '',
      products: [],
      prices: [],
      cart: [],
      total: 0,
      tax: 1,
      totalAndTax: 0,
    }
  }
  componentDidMount = async() => {
    const response= await client.query({
      query: gql`
        query GetCategories {
          categories {
            name
            products {
              id
              name
              inStock
              gallery
              description
              category
              attributes {
                id
                name 
                type
                items {
                  displayValue
                  value 
                  id
                }
              }
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
            }
          }
        }
      `
    })
    
     this.setState({
       categories: response.data.categories,
       title: response.data.categories[0].name, 
       products: response.data.categories[0].products,
       prices: response.data.categories[0].products[0].prices
     })
  }
  

  changeCategory = (categoryName) => {
    const data = this.state.categories;
    const result = data.filter((category) => {
      return category.name === categoryName;
    })
    // console.log(result);
    this.setState({
      title: result[0].name,
      products: result[0].products
    })
  }

  currencyChange = (valuta) => {
    for (let symbol of document.querySelectorAll('.productCurrencySymbol')) {
    // console.log(symbol.children);
      symbol.innerHTML = valuta;

    }
    
  }

  addProduct = (product) => {
    this.setState((state) => ({
      cart: state.cart.concat(product),
    }))
   
  } 


 /* addProduct = (product) => {
    this.setState({
      cart: [...this.state.cart, product]
    })
    
  } */

  increaseQuantity = (product) => {
    var array = [...this.state.cart];
    array.push(product);
    this.setState({
        cart: array
    })
    /* this.setState({
        cart: [...this.state.cart, product]
    }) */
  }

  descreaseQuantity = (product) => {
    var array = [...this.state.cart];
    var index = array.indexOf(product);
    if (index !== -1) {
        array.splice(index,1);
        this.setState({
            cart: array
        })
    }

 }

 /*handleClick = (e) => {
    e.preventDefault();
    if (e.currentTarget.parentElement.parentElement.classList.contains('Color')) {
      e.currentTarget.classList.toggle('selected2'); 
    } else {
      e.currentTarget.classList.toggle('custom');
    }
  } */
  

  render() {
     //console.log(this.state.prices);
    //console.log(this.state.shoppingCart);
    
    return (
      <Router>
         <div className='App'>
            <Header data={
              {categories: this.state.categories,
              changeCategory: this.changeCategory.bind(this),
              prices: this.state.prices,
              currencyChange: this.currencyChange.bind(this),
              cart: this.state.cart
            }
            }
          />
          <div className="content">
            <Switch>
              <Route exact path={["/", "/product-listing/category-:id"]}>
                <PLP data={
                  {title: this.state.title,
                  products: this.state.products}
                } />
              </Route>
              <Route path="/product-details/:id">
                <PDP data={
                  {
                    cart: this.state.cart,
                    addProduct: this.addProduct.bind(this)
                  }
                }/>
              </Route>
              <Route path="/cart">
                <Cart data={
                  {
                    cartProducts: this.state.cart,
                    increase: this.increaseQuantity.bind(this),
                    decrease: this.descreaseQuantity.bind(this),
                    total: this.state.total,
                    tax: this.state.tax,
                    totalAndTax: this.state.totalAndTax
                  }
                }/>
              </Route>
            </Switch>
          </div>
        </div> 
      </Router> 
    ) 
  }
}



