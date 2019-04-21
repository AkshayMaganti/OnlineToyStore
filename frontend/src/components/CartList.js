import React, { Component } from "react";
import CartItem from "./CartItem";
export default class CartList extends Component {
  
  state = {
    cart : this.props.cart
  }
  increment = (id) => {
    const index = this.state.cart.indexOf(this.getItem(id));
    let cartNew = this.state.cart;
    let product = cartNew[index];
    console.log(product);
    //product.quantity = product.quantity + 1;
    // this.setState({
    //   cart : cartNew,
    // })
  }
  getItem = (id) => {
    const product = this.state.idcart.find((item) => item.id === id);
    return product;
  };
  render() {
    const cart = this.props.cart;
    return (
      <div className="container-fluid">
        {cart.map(item => (
          <CartItem key={item.id} item={item} increment={this.increment.bind(this,item.id)}/>
        ))}
      </div>
    );
  }
}
