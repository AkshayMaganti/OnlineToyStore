import React, { Component } from 'react'
import Navbar from './Navbar';
import EmptyCart from './EmptyCart';
import CartColumns from './CartColumns';
import CartList from './CartList';
import Auth from '../services/Auth';
import {  Redirect } from 'react-router-dom';
import HistItem from './HistItem';
export default class extends Component {
  
  state={
    cart:[],
    products: [],
    histProducts: [],
    items: [],
    histItems: [],
    history: [],
  };
  

  componentDidMount() {
    const auth = new Auth();
    if(!auth.isAuthenticated()) {
      return;
    }
    fetch('/items',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username : auth.getSession()
			}),
		})
      .then(res => res.json())
      .then(res => res.map((item) => {
        //this.addToCart(item.id, item.quantity);
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
            newItem.push(item); 
            this.setState({
              products : newItem,
              histProducts: newItem
            });
          }))
          .then(x => {
            this.loadCart();
            this.loadHistory();
          });
        }
      )
      .then(
        y => {
          fetch('/history',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username : auth.getSession()
            }),
          })
            .then(res => res.json())
            .then(res => {res.map((item) => {
              let newItem = this.state.histItems;
              newItem.push(item); 
              this.setState({
                histItems : newItem
              });
            });
            }
            )
        }
      )
      
  }

  loadHistory = () => {
    let histtt = this.state.histItems;
    histtt.forEach((y) => {
      this.addToHistory(y.id, y.quantity);
    })
  }
  loadCart = () => {
    let newItems = this.state.items;
    newItems.forEach((x) => {
       this.addToCart(x.id, x.quantity);
      console.log(`id ${x.id} quan ${x.quantity}`)
    });
  }
  addToHistory = (id, quantity) => {
    let tempProducts = {};
    tempProducts = this.state.histProducts;
    const index = tempProducts.indexOf(this.getz(id));
    let product = {};
    product = tempProducts[index];
    
    if(product!=undefined){
      product.quantity = quantity;
      let hist = this.state.history;
      hist.push(product);
      this.setState({
        history : hist
      });
    }
  }
  getz = (id) => {
    const product = this.state.histProducts.find((item) => item.id === id);
    return product;
  }
  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  addToCart = (id,quantity1) => {
    var tempProducts = [];
    tempProducts = this.state.products;
    console.log("tempProducts -- ",tempProducts);
    const index = tempProducts.indexOf(this.getItem(id));
    console.log("Index -- ",index);
    var product = {};
    product = tempProducts[index];
    console.log(product);
    if(product!=undefined){
      product.quantity = quantity1;
      console.log("quantity:",product.quantity);
      console.log(product);
      const price = product.price;
      let newCart = this.state.cart;
      newCart.push(product);
      this.setState({
        cart:newCart,
        total : this.state.total + price
      });
    };
  };

  render() {
    let auth = new Auth();
    if(!auth.isAuthenticated())
      return <Redirect to="/" ></Redirect>;
        
         if (this.state.cart.length > 0) {
              return ( 
                <React.Fragment>
                  <Navbar user={auth.getSession()}></Navbar>
                  <h1> Your Cart </h1>
                  <CartColumns />
                  <CartList cart = {this.state.cart} user={auth.getSession()} products = {this.state.products}/>
                  {/* <CartTotals value={value} history={this.props.history} /> */} 
                  <h2>Your history</h2>
                  {this.state.history.map(item => (
                  <HistItem key={item.id} item={item} /> ))}
                </React.Fragment>
              );
            } else {
              return (
                <EmptyCart user={auth.getSession()} history={this.state.history}></EmptyCart>
                
              );
              
            }
     
    
  }
}
