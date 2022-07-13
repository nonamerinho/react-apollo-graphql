import React, { Component } from 'react'
import '../styles/cart.scss'
import thumbnail from '../thumbnail.png'

export default class Cart extends Component {
    state={
        total: 0,
        tax: 1,
        totalAndTax: 0
    }

  componentDidMount = async() => {
    let calculatingTotalPrice = () => {
        let totalPrice = 0;
        this.props.data.cartProducts.map((product) => {
        totalPrice = totalPrice + product.prices[0].amount;  
        })
        return totalPrice;
    }

    let calculatingTax = () => {
        let tax = 1;
        return tax = (calculatingTotalPrice() * 21) / 100;

    }

    let calculatingTotalPriceAndTax = () => {
        return calculatingTotalPrice() + calculatingTax();
    }

    this.setState({
            total: calculatingTotalPrice(),
            tax: calculatingTax(),
            totalAndTax: calculatingTotalPriceAndTax(),
        })
}  


  componentDidUpdate = async(previousProps, previousState) => {
    let calculatingTotalPrice = () => {
        let totalPrice = 0;
        this.props.data.cartProducts.map((product) => {
        totalPrice = totalPrice + product.prices[0].amount;  
        })
        return totalPrice;
    }

    let calculatingTax = () => {
        let tax = 1;
        return tax = (calculatingTotalPrice() * 21) / 100;

    }

    let calculatingTotalPriceAndTax = () => {
        return calculatingTotalPrice() + calculatingTax();
    }

    if (previousProps.data !== this.props.data) {
        this.setState({
            total: calculatingTotalPrice(),
            tax: calculatingTax(),
            totalAndTax: calculatingTotalPriceAndTax(),
        })
    }

   

    /*this.props.data.total = calculatingTotalPrice();
    this.props.data.tax = calculatingTax();
    this.props.data.totalAndTax = calculatingTotalPriceAndTax(); */
 } 

    nextImage = (evt,imgArray) => {
        var img = evt.currentTarget.parentNode.previousSibling;
            if (imgArray.length > 1) {
            for(var i = 0; i < imgArray.length;i++){
                if(imgArray[i] == img.src){
                    if(i === imgArray.length-1){
                        evt.currentTarget.parentNode.previousSibling.src = imgArray[0];
                        break;
                    }
                    evt.currentTarget.parentNode.previousSibling.src = imgArray[i+1];
                    break;
                }
            }
        }
    }

    previousImage = (evt,imgArray) => {
        var img = evt.currentTarget.parentNode.previousSibling;
        if(imgArray.length > 1) {
            for(var i = imgArray.length-1; i >=0 ;i--){
                if(imgArray[i] == img.src){
                    evt.currentTarget.parentNode.previousSibling.src = imgArray[i-1];
                    break;
                }
                if (imgArray[0] == img.src) {
                    evt.currentTarget.parentNode.previousSibling.src = imgArray[imgArray.length-1];
                }
            }
        }
    }


  render() {
    //console.log(this.state.total)
    console.log(this.props.data.cartProducts)
   // console.log(this.state.tax);
   //console.log(this.state.totalPriceAndTax)
    console.log(this.props.data.cartProducts);
    let removeDups = [...new Set(this.props.data.cartProducts)];
    //console.log(removeDups);
    var count = {};
    this.props.data.cartProducts.forEach(function(obj) {
        if (obj.hasOwnProperty('selectedAttributes') === false) {
            let key = obj.id;
            count[key] = (count[key] || 0) + 1;
        } else if (obj.hasOwnProperty('selectedAttributes') === true) {
            let key = Object.entries(obj.selectedAttributes[obj.selectedAttributes.length - 1]).toString() + "," + obj.id;
            count[key] = (count[key] || 0) + 1;
        }
        console.log(count);
    });

    
    
    return (
      <div className="container">
            <h1 className="cartHeader">Cart</h1>
            {removeDups.map((product) => {
            return (    
            <section className="productWrapper">
                <div className="productDetails1">
                    <h1 className='brand'>{product.name}</h1>
                    <h1 className='brandItem'>{product.id}</h1>
                    <p className='priceAmount'><span className='currency'>{product.prices[0].currency.symbol}{product.prices[0].amount}</span></p>
                    {product.hasOwnProperty('selectedAttributes') === true && 
                    <>
                        {Object.entries(product.selectedAttributes[product.selectedAttributes.length - 1]).map(([key,value]) => {
                            return (
                                <>
                                    <p className='attributeBold'>{key}:</p>
                                    <ul /*className={`attributesList ${attribute.id}`} */ className='attributesList'>
                                       <li className='attribute' style={{backgroundColor: value}}>{value}</li>
                                    </ul>
                                </>
                            )
                        })}
                    </>
                    }
                </div>
                <div className="productDetails2">
                    <div className="incrementAndDecrement">
                        <button onClick={() => this.props.data.increase(product)} className="incrementBox">+</button>
                        {product.hasOwnProperty('selectedAttributes') === false && <div className="unitBox">{count[product.id]}</div>}
                        {product.hasOwnProperty('selectedAttributes') === true && <div className="unitBox">{count[Object.entries(product.selectedAttributes[product.selectedAttributes.length - 1]).toString() + "," + product.id]}</div>}
                        <button onClick={() => this.props.data.decrease(product)} className="decrementBox">-</button>
                    </div>
                    <div className="productImage">
                        <img src={product.gallery[0]} width='200' height='288' className={`productImageDisplay ${product.id}`} alt="" />
                        <div className="slider">
                            <button onClick={(evt) => this.previousImage(evt,product.gallery)} className='slideLeft'>L</button>
                            <button onClick={(evt) => this.nextImage(evt,product.gallery)} className='slideRight'>R</button>
                        </div>
                    </div>
                </div>
            </section>
            )
            })}
            <div className="order">
                <p className='tax'>Tax 21%: <span className='taxCurrency'>$</span><span className='taxAmount'>{this.state.tax}</span></p>
                <p className='quantity'>Quantity: <span className='quantityAmount'>{this.props.data.cartProducts.length}</span></p>
                <p className="total">Total: <span className='totalCurrency'>$</span><span className='totalAmount'>{this.state.totalAndTax}</span></p>
                <button className="orderButton">ORDER</button>
            </div>
          </div>
          
    )
  }
}
