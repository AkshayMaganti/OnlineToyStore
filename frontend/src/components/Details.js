import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';
import Navbar from './Navbar';
export default class Details extends Component {
  constructor(props)
  {
    super(props);
  }
  addToCart = (id) => {
    fetch('/addToCart',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        user : this.props.user,
        id : id
			})
		})
  }

  render() {
    const {id,company,img,info,price,title} = this.props.location.state.detailProduct;
    return (
      <React.Fragment>
      <Navbar></Navbar>
            <div classname="container py-5">
              <div className = "row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1> {title} </h1>
                </div>
              </div>
              <div className = "row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="product"/>
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2> model: {title} </h2>
                  <h4 className="text-uppercase mt-3 mb-2">
                  made by: <span className="text-uppercase"> {company} </span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price: <span>$</span> {price} 
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                   some info about the product:
                  </p>
                  <p className="text-muted lead">{info}</p>
                  <div>
                      <Link to={{pathname:"/toylist", user:this.props.location.state.user}}>
                          <ButtonContainer> back to products </ButtonContainer>
                      </Link>
                      <ButtonContainer cart
                      //disabled={inCart?true:false}
                      onClick = {()=>{
                        this.addToCart(id);
                      }}
                      >
                      add to cart
                      {/* //  {inCart ? "inCart":"add to cart"} */}
                      </ButtonContainer>
                  </div>
                  </div>
                </div>
              </div>
            

        {/* </ProductConsumer> */}
        </React.Fragment>

    )
  }
}
