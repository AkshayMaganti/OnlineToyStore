import React, { Component } from "react";
import Navbar from './Navbar';
export default class EmptyCart extends Component {
  constructor(props) {
    super(props);
  
  };
  render(){
  return (
    <React.Fragment>
    <Navbar user={this.props.user}></Navbar>
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title text-capitalize">
          <h1>your cart is currently empty</h1>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}
}