import React, { Component } from 'react'
import Header from './Header'
import { gql } from '@apollo/client'
import { client } from '../index'
import '../styles/plp.scss'
import { Link } from 'react-router-dom'


export default class PLP extends Component {
  
  render() {
    return (
      <>     
        <h2 className='categoryTitle'>{this.props.data.title}</h2>
        <ol className="productListing">
          {this.props.data.products.map((product) => {
          const {id, name, inStock, gallery, category, prices} = product;
          
         // console.log({prices});
          return (
            <li className={`productCard ${inStock}`} key={id}>
              <Link to={{
                pathname: `/product-details/${product.id}`,
                state: product
              }} className='productCardLink'>
                <img src={gallery[0]}  width="354" height="330" alt=""  />
                <div className="productContent">
                  <p className='productName'>{name}</p>
                  <div className='productCurrency'>
                    <p className='productCurrencySymbol'>{prices[0].currency.symbol}</p>
                    <p className="productCurrencyAmount">{prices[0].amount}</p>
                  </div>
                </div>
              </Link>  
           </li>
          )
          })}
        </ol>
      </>
    )
  }
}
