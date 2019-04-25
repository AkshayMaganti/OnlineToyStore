import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ButtonContainer} from './Button';
import {  Redirect } from 'react-router-dom';
import ToyList from './ToyList';
import Auth from '../services/Auth';

let auth = new Auth();

export default class Navbar extends Component {

    constructor(){
        super();
    };

    logout(){
        auth.logout();
        window.location.reload();
    }
  render() {
    let x = '';
    if (auth.isAuthenticated() ){
        x = 'logout'
    }
    else {
        x = 'login'
    }
    return(
        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <ul className="navbar-nav align-items-center">
        <li>
            <Link to={{pathname: "/toylist",user: auth.getSession()}} className="nav-link">
                Toys
            </Link>
        </li>
        </ul>
       
        <Link to={{pathname: "/cart",user: auth.getSession()}} className="ml-auto">
        <ButtonContainer>
            <span className="mr-2">
            <i className="fas fa-cart-plus"></i>
            </span>
                My Cart
        </ButtonContainer>
        </Link>
        <ButtonContainer onClick={this.logout}>
            <span className="mr-2">
            <i className="fas "></i>
            </span>
            
                {x}
        </ButtonContainer>
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
