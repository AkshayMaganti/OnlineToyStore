import React from "react";
import Navbar from './Navbar';
export default function EmptyCart() {
  return (
    <React.Fragment>
    <Navbar></Navbar>
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
