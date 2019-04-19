import React, { Component } from 'react'
import Navbar from './Navbar';
import CartToy from './CartToy';
import Toy from './Toy';
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
    //console.log("calling cdm");
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

      // let x = this.state.products;
      // console.log("x:",x);
      // x.forEach( function(y){ console.log(y)});
      // //console.log(this.state.items);
      
  }

  loadCart = () => {
    //console.log("Calling load cart.")
    let newItems = this.state.items;
    //console.log(newItems);
    newItems.forEach((x) => {
      //console.log(x.id);
       this.addToCart(x.id, x.quantity);
      
    });
    console.log(this.state.cart);
    // const cartToys = this.state.cart.forEach(cartItem => {
    //   <CartToy key={cartItem.id} cart ={cartItem} user={this.props.location.user}/>
    // })
  }

  getItem = (id,tempProducts) => {
    //console.log("pid:",id);
    //{id,title,company,category,price}
    const product = tempProducts.find((item) => item.id === id);
    //console.log("title:", title);
    return product;
  };

  addToCart = (id,quantity) => {
    let tempProducts = this.state.products;
    //console.log("temp products:", tempProducts);
    const index = tempProducts.indexOf(this.getItem(id,tempProducts));
    //console.log("index:", index);
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
            return this.state.cart.map(product => {
              console.log(product);
              return <CartToy key={product.id} cart={product} user={this.props.location.user}/>
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
