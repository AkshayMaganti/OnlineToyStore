import React, { Component } from "react";
import CartItem from "./CartItem";
import {ButtonContainer} from './Button';
import {  Redirect } from 'react-router-dom';
export default class CartList extends Component {
  
  state = {
    cart : this.props.cart
  }
  increment = (id) => {
    const index = this.state.cart.indexOf(this.getItem(id));
    let cartNew = this.state.cart;
    let product = cartNew[index];
    product.quantity = product.quantity + 1;
    this.setState({
      cart : cartNew,
    });
  }
  decrement = (id) => {
    const index = this.state.cart.indexOf(this.getItem(id));
    let cartNew = this.state.cart;
    let product = cartNew[index];
    if (product.quantity > 0){ 
     product.quantity = product.quantity - 1;
    }
    this.setState({
      cart : cartNew,
    });
  }
  remove = (id) => {
    const index = this.state.cart.indexOf(this.getItem(id));
    let cartNew = this.state.cart;
    cartNew.splice(index,1);
    this.setState({
      cart : cartNew,
    });
  }
  getItem = (pid) => {
    let cartNew = this.state.cart;
    let product = cartNew.find((item) => item.id == pid);
    return product;
  };
  updateCart = () => {
    let cartNew = this.state.cart;
    let object = []
    cartNew.map((item) => {
      let temp = {"id" : item.id, "quantity" : item.quantity};
      object.push(temp);
    })
    console.log(object);
    fetch('/updatecart',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username : this.props.user,
				items : object ,
			}),
    })
    .then( res => <Redirect to={{pathname:"/toylist", user: this.props.user }}></Redirect>);
  }
  render() {
    const cart = this.props.cart;
    return (
      <div className="container-fluid">
        {cart.map(item => (
          <CartItem key={item.id} item={item} increment={this.increment} decrement={this.decrement} remove={this.remove}/>
        ))}
        <div onClick={this.updateCart}>
          <ButtonContainer>
            <span className="mr-2" >
            <i className="fas " ></i>
            </span>
                save changes to cart
        </ButtonContainer>
        </div>
        
      </div>
    );
  }
}
