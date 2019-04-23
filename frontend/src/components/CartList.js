import React, { Component } from "react";
import CartItem from "./CartItem";
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';
import {  Redirect } from 'react-router-dom';

export default class CartList extends Component {
  
  state = {
    cart : this.props.cart,
    items: [],
    products: this.props.products,
    history: []
  }

  componentDidMount() {
    if(this.props.user === undefined) {
      return (
        <Redirect to={{pathname:"/"}} ></Redirect>
        );
    } 
  }
  
  increment = (id) => {
    const index = this.state.cart.indexOf(this.getItem(id));
    let cartNew = this.state.cart;
    let product = cartNew[index];
    if (product.quantity < product.inventory){
      product.quantity = product.quantity + 1;
    }
    else {
      alert(`We have only ${product.quantity} of ${product.title}`);
    }
    this.setState({
      cart : cartNew,
    });
  }
  decrement = (id) => {
    const index = this.state.cart.indexOf(this.getItem(id));
    let cartNew = this.state.cart;
    let product = cartNew[index];
    if (product.quantity > 1){ 
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
    .then( res => {return <Redirect to={{pathname:"/toylist", user: this.props.user }}></Redirect>});
  }

  checkout = () => {
    let cartNew = this.state.cart;
    let object = []
    cartNew.map((item) => {
      let temp = {"id" : item.id, "quantity" : item.quantity};
      object.push(temp);
    });
    fetch('/checkout',{
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
    .then(res => this.setState({
      cart : []
    }));
  }
  render() {
    const cart = this.props.cart;
    return (
      <div className="container-fluid">
        {cart.map(item => (
          <CartItem key={item.id} item={item} increment={this.increment} decrement={this.decrement} remove={this.remove}/>
        ))}
        <div onClick={this.updateCart}>
        <Link to={{pathname: "/toylist",user: this.props.user}}>
        
          <ButtonContainer>
            <span className="mr-2" >
            <i className="fas " ></i>
            </span>
                save changes to cart
        </ButtonContainer>
        </Link>
        </div>
        
        <Link to={{pathname: "/toylist",user: this.props.user}}>
        <div onClick={this.checkout}>
          <ButtonContainer>
            <span className="mr-2" >
            <i className="fas " ></i>
            </span>
               Checkout
        </ButtonContainer>
        </div>
        </Link>
        {/* <h2>Your history</h2>
        {this.state.history.map(item => (
          <HistItem key={item.id} item={item} />
        ))} */}
      </div> 
    );
  }
}
