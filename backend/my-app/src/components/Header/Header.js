import React, { Component } from 'react';
import styles from './Header.module.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class Header extends Component {
    render() {
      return (
        <div className = {styles.header}>
          <button className = {styles.button}> Home </button>
          <Link to="/toys/"><button className = {styles.button}> Toys </button></Link>
          <Link to="/user/"><button className = {styles.button}> User </button></Link>
          <Link to="/login/"><button className = {styles.button}> Login </button></Link>
          <button className = {styles.buttonsearch}>Search</button>
          <input className = {styles.search} type="text" placeholder="Search toys ..." aria-label="Search" />

        </div>
      );
    }
  }
  
  export default Header;