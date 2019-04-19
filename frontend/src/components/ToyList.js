import React, { Component } from 'react';
import Toy from './Toy';
import Navbar from './Navbar';
import {ButtonContainer} from './Button';
import {FormControl, FormGroup, Button, Form} from 'react-bootstrap';
import './ToyList.css';
import Select from 'react-select';


export default class ToyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentpage :1,
      numberperpage:4,
      searchlist: []
    };
    this.handleClick = this.handleClick.bind(this);
  }
 
  handleBlur = (e) => {
    if(e.target.value != "")
    {
        this.loadproducts(e.target.value);
    }
  }

  handleClick(event) {
    this.setState({
      currentpage: Number(event.target.id)
    });
  }

  componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  loadproducts = (textValue) => {
      let newList = [];
      newList = this.state.products.filter(item => {
          const item_lc = item.title.toLowerCase();
          const search_val = textValue.toLowerCase();
          return item_lc.includes(search_val);
      });
      this.setState({
          searchlist: newList
      });

    }

  render() {
    const { products, currentpage, numberperpage } = this.state;
    
   
    // Logic for displaying toys
    const indexOfLastToy = currentpage * numberperpage;
    const indexOfFirstToy = indexOfLastToy - numberperpage;
    const currentToys = products.slice(indexOfFirstToy, indexOfLastToy);

    const renderToys= currentToys.map(product => {
      return  <Toy key={product.id} product ={product}/>;
    });

    const rendersearched= this.state.searchlist.map(product => {
      return  <Toy key={product.id} product ={product}/>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / numberperpage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li>
          <ButtonContainer
              onClick={this.handleClick}
              key = {number}
              id = {number}>
              {number}
          </ButtonContainer>
        </li>
      );
    });

    
    return (
      <React.Fragment>
         <Navbar></Navbar>
        <div className="py-5">
        <div className="container">
        
          <input type="text" className="input mr-sm-2" placeholder="Search..." onBlur={this.handleBlur}/>

          
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
        {rendersearched}

        </div>

        <div className="row">
        {renderToys}
        </div>
        <div className="card-footer">
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
        </div>
        </div>
        </div>
      </React.Fragment>
    );

  }
}

