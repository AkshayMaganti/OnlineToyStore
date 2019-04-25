import React, { Component } from 'react';
import { render } from 'react-dom'; 
import {Switch,Route} from 'react-router-dom';
import './App.css';
import '.././node_modules/bootstrap/dist/css/bootstrap.min.css';
import ToyList from './components/ToyList';
import Toy from './components/Toy';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Login from './components/Login';
import './components/Login.module.css';
import Auth from './services/Auth';

class App extends Component {

  render() {
    return(
     <React.Fragment>  
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/toylist" component={ToyList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
     </React.Fragment>
    );
  }
}

export default App;
