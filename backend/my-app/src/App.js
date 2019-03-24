import React, { Component } from 'react';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import User from './components/User/User';
import Toys from './components/Toys/Toys';
//modules
import cssStyles from './First.module.css';


import { BrowserRouter, Route, Link } from 'react-router-dom';


class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/home/" component={User}/>
          <Route path="/user/" component={User}/>
          <Route path="/login/" component={Login}/>
          <Route path="/header/" component={Header}/>
          <Route path="/toys/" component={Toys}/>
        </div>
      </BrowserRouter>
      
        
      // <div className={cssStyles.body}>
      
      //   <Header />
      //   <Login />
      //   <div className={cssStyles.users}>
      //     <h1> Already existing users</h1>
      //     {this.state.users.map(user =>
      //       <div key={user._id}>{user.first_name} </div>
      //     )}
      //   </div>
        
      // </div>
    );
  }
}

export default App;
