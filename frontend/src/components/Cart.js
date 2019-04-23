import React, { Component } from 'react'
import Navbar from './Navbar';
import EmptyCart from './EmptyCart';
import CartColumns from './CartColumns';
import CartList from './CartList';
import {ProductConsumer} from '../context';
import {  Redirect } from 'react-router-dom';
import HistItem from './HistItem';
export default class extends Component {
  
  state={
    cart:[],
    products: [],
    items: [],
    histItems: [],
    history: [],
  };
  

  componentDidMount() {
    if(this.props.location.user === undefined) {
      return (
        <Redirect to={{pathname:"/"}} ></Redirect>
        );
    }
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
            newItem.push(item); 
            this.setState({
              products : newItem
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
              username : this.props.location.user
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
            console.log(this.state.history);
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
      
    });
  }
  addToHistory = (id, quantity) => {
    let tempProducts = this.state.products;
    const index = tempProducts.indexOf(this.getz(id));
    let product = tempProducts[index];
    
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
    const product = this.state.products.find((item) => item.id === id);
    return product;
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
                  <Navbar user={this.props.location.user}></Navbar>
                  <h1> Your Cart </h1>
                  <CartColumns />
                  <CartList cart = {this.state.cart} user={this.props.location.user} products = {this.state.products}/>
                  {/* <CartTotals value={value} history={this.props.history} /> */} 
                  <h2>Your history</h2>
                  {this.state.history.map(item => (
                  <HistItem key={item.id} item={item} /> ))}
                </React.Fragment>
              );
            } else {
              return (
                <EmptyCart user={this.props.location.user} history={this.state.history}></EmptyCart>
                
              );
              
            }
     
    
  }
}
