import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ButtonContainer} from './Button';
import {  Redirect } from 'react-router-dom';
import ToyList from './ToyList';
export default class Navbar extends Component {
    constructor(){
        super();
    };
    
  render() {
    let x = '';
    if (this.props.user != undefined ){
        x = 'logout'
    }
    else {
        x = 'login'
    }
    return(
        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <ul className="navbar-nav align-items-center">
        <li>
            <Link to={{pathname: "/toylist",user: this.props.user}} className="nav-link">
                Toys
            </Link>
        </li>
        </ul>
       
        <Link to={{pathname: "/cart",user: this.props.user}} className="ml-auto">
        <ButtonContainer>
            <span className="mr-2">
            <i className="fas fa-cart-plus"></i>
            </span>
                My Cart
        </ButtonContainer>
        </Link>
        <Link to={{pathname: "/"}} className="ml-auto">
        <ButtonContainer>
            <span className="mr-2">
            <i className="fas "></i>
            </span>
            
                {x}
        </ButtonContainer>
        </Link>
        </NavWrapper>
    );

  }
}


const NavWrapper = styled.nav`
background: var(--mainBlue);
.nav-link{
    color:var(--mainWhite)! important;
    font-size:1.3rem;
    text-transform:capitalize;
}
`
