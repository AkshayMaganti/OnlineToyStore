import React, { Component } from 'react';
import {toyProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state={
    products: [],
    detailProduct:detailProduct,
    cart:[]
};

componentDidMount(){
  this.setToys();
};

setToys = () => {
  let tempProducts = [];
  toyProducts.forEach(item => {
    const singleItem = {...item};
    tempProducts = [...tempProducts,singleItem];
  });
  
  this.setState(()=>{
    return {products: tempProducts}
  });
};

getItem = (id) => {
  const product = this.state.products.find(item => item.id == id);
  return product;
};

handleDetail = id =>{
    const product = this.getItem(id);
    this.setState(() => {
      return {detailProduct: product}
    })
};

addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(()=>{
      return { products: tempProducts, cart:[...this.state.cart]};
    });
};

  render() {
    return (
      <ProductContext.Provider value={{
          ...this.state,
          handleDetail:this.handleDetail,
          addToCart:this.addToCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider,ProductConsumer};