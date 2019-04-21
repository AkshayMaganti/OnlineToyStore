import React, { Component } from 'react'
import Navbar from './Navbar';
import EmptyCart from './EmptyCart';
import CartColumns from './CartColumns';
import CartList from './CartList';
import {ProductConsumer} from '../context';
export default class extends Component {
  
  state={
    cart:[],
    products: [],
    items: [],
    total: 0
  };
  

  componentDidMount() {
    fetch('/items',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username : this.props.location.user
			}),
		})
      .then(res => res.json())
      .then(res => res.map((item) => {
        this.addToCart(item.id, item.quantity);
        let newItem = this.state.items;
        newItem.push(item); 
        this.setState({
          items : newItem
        });
      }))
      .then(
        x => {
          fetch('/products')
          .then(res => res.json())
          .then(res => res.map((item) => {
            let newItem = this.state.products;
            //console.log(newItem.pop());
            newItem.push(item); 
            this.setState({
              products : newItem
            });
          }))
          .then(x => {
            this.loadCart();
          });
        }
      );
      
  }

  loadCart = () => {
    let newItems = this.state.items;
    newItems.forEach((x) => {
       this.addToCart(x.id, x.quantity);
      
    });
    console.log(this.state.cart);
  }

  getItem = (id,tempProducts) => {
    const product = tempProducts.find((item) => item.id === id);
    return product;
  };

  addToCart = (id,quantity) => {
    let tempProducts = this.state.products;
    const index = tempProducts.indexOf(this.getItem(id,tempProducts));
    let product = tempProducts[index];
    
    if(product!=undefined){
      product.quantity = quantity;
      const price = product.price;
      let newCart = this.state.cart;
      newCart.push(product);
      this.setState({
        cart:newCart,
        total : this.state.total + price
      });
    }
  };

  render() {
         if (this.state.cart.length > 0) {
              return ( 
                <React.Fragment>
                  <Navbar></Navbar>
                  <h1> Your Cart </h1>
                  <CartColumns />
                  <CartList cart = {this.state.cart} />
                  {/* <CartTotals value={value} history={this.props.history} /> */} 
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
             
            }
     
    
  }
}
