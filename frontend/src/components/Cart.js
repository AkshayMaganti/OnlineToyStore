import React, { Component } from 'react'
import Navbar from './Navbar';
import CartToy from './CartToy';
import {ProductConsumer} from '../context';
export default class extends Component {
  
  state={
    cart:[],
    products: [],
    items: [],
    total: 0
    //username : ''
  };
  //let username = this.props.location.username;

  componentDidMount() {
    // this.setState({
    //   username : this.props.location.state.username
    // });
    console.log("the path name is ",this.props.location.pathname);
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
        let newItem = this.state.items;
        newItem.push(item); 
        this.setState({
          items : newItem
        })
      }));

      
      fetch('/products')
      .then(res => res.json())
      .then(res => res.map((item) => {
        let newItem = this.state.products;
        newItem.push(item); 
        this.setState({
          products : newItem
        })
      }));
      console.log(this.state.products);
      this.loadCart();
      console.log(this.state.items);
  }

  loadCart = () => {
    this.state.items.map((x) => {
      this.addToCart(x.id, x.quantity);
      console.log(x);
    });
    console.log(this.state.cart);
  }

  getItem = (id) => {
    const product = this.state.products.find(item => item.id == id);
    return product;
  };

  addToCart = (id,quantity) => {
    let tempProducts = this.state.products;
    console.log("temp products:", tempProducts);
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.count = quantity;
    const price = product.price;
    const total = this.state.total + price;
    let newCart = this.state.cart;
    newCart.push(product);
    this.setState({
      cart:newCart,
      total : total
    });
  };

  render() {
    return (
      <React.Fragment>
         <Navbar user={this.props.location.user} ></Navbar>
        <div className="py-5">
        <div className="container">
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center text-blue">
            <h1 className="text-capitalize font-weight-bold">
              Hello {this.props.location.user}!!
            </h1>
            <h1 className="text-capitalize font-weight-bold">
                  Your Cart
            </h1>
            </div>
        </div>
        
        <div className="row">
        <ProductConsumer>
          {value =>{
           return value.cart.map(cart => {
             return <CartToy key={cart.id} cart ={cart} user={this.props.location.user}/>
           })

          }}
        </ProductConsumer>
        </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
}
