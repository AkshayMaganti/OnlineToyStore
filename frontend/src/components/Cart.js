import React, { Component } from 'react'
import Navbar from './Navbar';
export default class extends Component {
  render() {
    return (
      <div>
        <Navbar user={this.props.location.user}></Navbar>
        <h3> Hello from cart</h3>
        {this.props.location.user}
      </div>
    )
  }
}
