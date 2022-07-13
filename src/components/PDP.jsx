import React, { Component } from 'react'
import '../styles/pdp.scss'
import image1 from '../image1.png'
import image2 from '../image2.png'
import image3 from '../image3.png'
import thumbnail from '../thumbnail.png'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

class PDP extends Component {
  state = {
    currentProduct: this.props.location.state,
    selectState: [],
    testObj: {},
    buttonStatusDisabled: true,
    checkedValues: []
  } 
 

  changeThumbnail = (newThumbnail) => {
    document.querySelector(".big-image").src = newThumbnail;

  }


  /*handleChange = (evt,attribute) => {
    this.setState((state) => ({
      var {currentProduct} = state;
      currentProduct[attribute] = evt.target.value;
      return CurrentProduct;
    }))
  } */

  testFunction = (evt) => {
    console.log(evt.currentTarget.checked);
  }

  componentDidMount = async() => {
    if (this.state.currentProduct.inStock === true) {
      if (this.state.currentProduct.attributes.length < 1) {
        this.setState({
          buttonStatusDisabled: false
        })
      }
    } 
  } 

  componentDidUpdate = async() => {
    if (this.state.currentProduct.inStock === true) {
      let test2 = document.querySelectorAll('.attributesList');
      console.log(test2.length);
      let test = document.querySelectorAll('input');
      let checkedValues = [];
      test.forEach(function(item) {
        if (item.checked === true) {
          checkedValues.push(item);
        }
      })
      if (test2.length <= checkedValues.length) {
        this.setState({
          buttonStatusDisabled: false
        })
      }
    }
  } 

  
  render() {
   // console.log(this.state.buttonStatusDisabled);
    let product = this.state.currentProduct;
    console.log(this.state.currentProduct);

      let handleChange = (evt,attribute) => {
        const test = JSON.parse(JSON.stringify(product));
        this.state.testObj[attribute] = evt.target.value;
          console.log(this.state.testObj, 'original Attribut')
        const testAttribute = JSON.parse(JSON.stringify(this.state.testObj));
          console.log(testAttribute, 'clona Attribut');
        this.state.selectState.push(testAttribute);
          console.log(this.state.selectState, 'original Array Attribute Selectate');
        const testAttributeArray = JSON.parse(JSON.stringify(this.state.selectState));
          console.log(testAttributeArray, 'clona Array Attribute Selectate');
        let selectedAttributes = [...new Set(testAttributeArray)];
          console.log(selectedAttributes, 'original Array Attribute Selectate FARA DUPS');
        const removeDupsSelectedAttributes = JSON.parse(JSON.stringify(selectedAttributes));
          console.log(removeDupsSelectedAttributes, 'clona Array Attribute Selectate FARA DUPS')
        test.selectedAttributes = removeDupsSelectedAttributes;
          console.log(test, 'PRODUS FINAL')
        this.setState((state) => ({
          currentProduct: test,
          /*buttonStatusDisabled: false */
        }))
      }

    return (
      <>
        <div className="wrapper">
            <div className="images">
                {product.gallery.map((photo) => {
                  return (
                    <img src={photo} key={photo} alt="" width='79' height='80' className="small-image" onClick={() => this.changeThumbnail(photo)}/>
                  )
                })}
            </div>
            <div className="thumbnail">
                <img className='big-image' width='610' height='511' src={product.gallery[0]} alt="" />
            </div>
            <div className="details">
                <h1 className='name'>{product.name}</h1>
                {product.attributes.length > 0 && 
                  <>
                    {product.attributes.map((attribute, i) => {
                     // console.log(product.attributes)
                      return (
                        <>
                          <p className='attributeBold' key={attribute}>
                            {attribute.name}:
                          </p>
                          <ul className={`attributesList ${attribute.id}`} key={attribute.id}>
                          {product.attributes[i].items.map((item) => {
                            return (  
                              <li>
                                <input onClick={this.testFunction} className={attribute.id} onChange={(evt) => handleChange(evt,attribute.id)} type="radio" id={`attribute ${attribute.id} ${item.id}`} name={`attributesList ${attribute.id}`} value={item.displayValue}/> 
                                <label className={`attribute ${item.id}`} style={{backgroundColor: item.value}} htmlFor={`attribute ${attribute.id} ${item.id}`}>{item.displayValue}</label>
                              </li>
                            )
                          })}
                          </ul>
                      </>
                      )
                    })}
                  
                    
                  </>
                }
                <div className="price">PRICE
                    <p className='priceAmount'><span className='priceSymbol'>{product.prices[0].currency.symbol}</span>{product.prices[0].amount}</p>
                </div>
                <button disabled={this.state.buttonStatusDisabled} className="addToCart" onClick={() => this.props.data.addProduct(this.state.currentProduct)}>ADD TO CART</button>
                <p className="productDescription" dangerouslySetInnerHTML={{ __html: product.description }}/>
            </div>
        </div>
      </>
    )
  }
}

export default withRouter(PDP);