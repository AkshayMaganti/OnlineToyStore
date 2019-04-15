import React, { Component } from 'react';
import Toy from './Toy';
import Title from './Title';
import {ProductConsumer} from '../context';
import Navbar from './Navbar';
import {  Redirect } from 'react-router-dom';
export default class ToyList extends Component {
  constructor(){
    super();

  }
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
                  Toys List
            </h1>
            </div>
        </div>
        
        <div className="row">
        <ProductConsumer>
          {value =>{
           return value.products.map(product => {
             return <Toy key={product.id} product ={product}/>
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
