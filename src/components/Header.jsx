import React, { Component } from 'react'
import '../styles/header.scss'
import header_logo from '../header_logo.png'
import dollar_logo from '../dollar_logo.png'
import vector from '../vector.png'
import empty_cart from '../empty_cart.png'
import { client } from '../index'
import { gql } from '@apollo/client'
import { Link } from 'react-router-dom'


export class Header extends Component {
  showDropDown = () => {
    const menu = document.querySelector('.dropDown');
    menu.classList.toggle('active');
    // console.log(menu);
  }

  render() {
   
    return (
        <header className='header'>
          <div className="categories">
        {this.props.data.categories.map(({name}) => (
          <Link to={`/product-listing/category-${name}`} key={name} id={name} onClick={() => this.props.data.changeCategory(name)} className="category">{name}</Link>
         ))}
      </div>
          <div><img src={header_logo} alt="logo" width="41" height="41"/></div>
          <div className='actions'>
            <button className='currency'><img src={dollar_logo} alt="" /></button>
            <button disabled className='vector' onClick={() => this.showDropDown()}><img src={vector} alt="" /></button>
            <Link to={`/cart`} className='cart'>
              <img src={empty_cart} alt=""/>
              <p className='cartItems'>{this.props.data.cart.length}</p>
            </Link>
            <ul className="dropDown" id="drop">
              {this.props.data.prices.map((price) => (
                  <li className="dropDownItem" key={price.currency.label} onClick={() => this.props.data.currencyChange(price.currency.symbol)}>
                    {price.currency.symbol} {price.currency.label}
                  </li>
              ))}
            </ul>
          </div>
        </header>
    )
  }
}

export default Header

