import React, { Component } from 'react';
import Toy from './Toy';
import Navbar from './Navbar';
import {ButtonContainer} from './Button';
import './ToyList.css';
import {Link} from 'react-router-dom';
import Auth from '../services/Auth';
const auth = new Auth();
export default class ToyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentpage :1,
      numberperpage:4,
      searchlist: [],
      search_query: '',
      filter_query: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }
 
  change = (e) => {
    if(e.target.value != "default")
    {
        this.state.filter_query = e.target.value;
    }
    else{
      this.state.filter_query = '';
    }
  }
  handleBlur = (e) => {
    if(e.target.value != "")
    {
        this.state.search_query = e.target.value;
    }
    else
    {
      this.state.search_query = '';
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

  handleData(event){
    this.loadproducts();
  }
  loadproducts = () => {
      let newList = [];
          if(this.state.search_query != '' && this.state.filter_query != 'default')
          {
            newList = this.state.products.filter(item => {
              const item_lc = item.title.toLowerCase();
              const item_pc = item.category.toLowerCase();
              const search_val = this.state.search_query.toLowerCase();
              const filter_val = this.state.filter_query.toLowerCase();
              // const item_lc.includes(search_val);
          })
        }
          else if (this.state.search_query != '')
          {

          }
          else if(this.state.filter_query != 'default')
          {

          }
          else{
            this.setState({
              searchlist: []
            });
          }
          
      
    }

  render() {
    const { products, currentpage, numberperpage } = this.state;

    // Logic for displaying toys
    const indexOfLastToy = currentpage * numberperpage;
    const indexOfFirstToy = indexOfLastToy - numberperpage;
    const currentToys = products.slice(indexOfFirstToy, indexOfLastToy);

    

    const renderToys= currentToys.map(product => {
      return  <Toy key={product.id} product ={product} products={this.state.products} user={auth.getSession()}/>;
    });

    const rendersearched= this.state.searchlist.map(product => {
      return  <Toy key={product.id} product ={product} products={this.state.products} user={auth.getSession()}/>;
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
         <Navbar user={auth.getSession()}></Navbar>
        <div className="py-5">
        <div className="container"> 
        <div class="row">
                <form class="form-inline">
                        <select name="search_param" id="search_param" class="btn btn-default dropdown-toggle" data-toggle="dropdown" onChange={this.change} value={this.state.value}>
                        <option value="default">Default</option>
                        <option value="Board games">Board Games</option>
                        <option value="toy car">Toy Car</option>
                        </select>
                    <input type="text" class="form-control" name="x" placeholder="Search toys..." onChange={this.handleBlur}></input>
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="submit" onclick={this.handleData}>
                           <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </form>          
        </div>          
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center text-blue">
            <h1 className="text-capitalize font-weight-bold">
              Hello {auth.getSession()}!!
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
          {auth.isAdmin() ? <Link to="/newform">
          <ButtonContainer>{"Add a new Product"}</ButtonContainer>
          </Link>
          :<p></p>
          } 
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

