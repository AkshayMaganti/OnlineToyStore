import React,{ Component } from 'react';
//import axios from 'axios';
import styles from './Login.module.css';
import {FormControl, FormGroup, Button, Form} from 'react-bootstrap';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';


class Login extends Component {

		constructor(){
			super();
			this.state = {
				formFields : {
					fname : '',
					lname : '',
					username: '',
					email : '',
					pwd : ''
				},
				login : true,
				loginFields : {
					username : '',
					password : ''
				},
				isLoggedIn : false
			}

		}	
		

		render(){
			{ if (this.state.login === false && !this.state.isLoggedIn)
			return (
				
			<div className = {styles.signup}>
				<h2 className={styles.h2}>Sign Up</h2>
				<Form  name="myForm" id="signUpForm" onSubmit={this.formHandler}>
						
					<FormGroup className={styles.formgroup}>
						<FormControl type="name" className={[styles.formcontrol,styles.name1]} placeholder="First Name" name="fname" onChange={this.inputChangeHandler}  />
						<FormControl type="name" className={[styles.formcontrol,styles.name2]} placeholder="Last Name" name="lname" onChange={this.inputChangeHandler} />
					</FormGroup>
					<FormGroup className={styles.formgroup}>
						<FormControl type="name" className={styles.formcontrol} placeholder="Username" name="username" onChange={this.inputChangeHandler}/>
					</FormGroup>
					<FormGroup className={styles.formgroup}>
						<FormControl type="email" className={styles.formcontrol} placeholder="Email" name="email" onChange={this.inputChangeHandler}/>
					</FormGroup>
					<FormGroup className={styles.formgroup}>        
						<FormControl type="password" className={styles.formcontrol} placeholder="Password" name="pwd" onChange={this.inputChangeHandler}/>
					</FormGroup>
					<FormGroup className={styles.formgroup}>
						<FormControl type="password" className={styles.formcontrol} placeholder="Confirm Password" name="cpwd" onChange={this.inputChangeHandler} />
					</FormGroup>
					<FormGroup className={styles.formgroup}>        
						<FormGroup className="checkbox">
							<p><label><input type="checkbox" name="remember" /> I accept the Terms of Use & Privacy Policy</label></p>
						</FormGroup>
					</FormGroup>
					<FormGroup className={styles.formgroup}>        
						<Button type="submit" className="btn btn-primary">Sign Up</Button>
					</FormGroup>
					<p>Already a member? <a onClick={this.changeLogin}>Login</a></p>
				</Form>
				
			</div>
			
		)
		else if (this.state.login === true && !this.state.isLoggedIn)
			return (
			<div className = {styles.signup}>
				<h2 className={styles.h2}>Login</h2>
				<Form  name="loginForm"  id ="loginForm" onSubmit={this.loginHandler}>
					<FormGroup className={styles.formgroup}>
						<FormControl type="text" className={styles.formcontrol} placeholder="Username" name="username" onChange={this.inputChangeHandler2} />
					</FormGroup>
					<FormGroup className={styles.formgroup}>        
						<FormControl type="password" className={styles.formcontrol} placeholder="Password" name="password" onChange={this.inputChangeHandler2}/>
					</FormGroup>
					<FormGroup className={styles.formgroup}>        
						<Button type="submit" className="btn btn-primary">Login</Button>
					</FormGroup>
					<p>Not a member? <a onClick={this.changeLogin}>Sign Up</a></p>
				</Form>
		
			</div>
			)
		else if (this.state.isLoggedIn)
				return (<Redirect to={{pathname:"/user"}} />);
		}
	
	};
				
	// keeps updating the state values in signup
	inputChangeHandler = e => {
		let formFields = {...this.state.formFields};
		formFields[e.target.name] = e.target.value;
		this.setState({
		formFields
		});
		
	}
	// keeps updating the state values in login
	inputChangeHandler2 = e => {
		let loginFields = {...this.state.loginFields};
		loginFields[e.target.name] = e.target.value;
		this.setState({
			loginFields
		});
		
	}

	//calls the api on submitting the form
	
	formHandler = e => {
		e.preventDefault();
		fetch('/register',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fname : this.state.formFields.fname ,
				lname : this.state.formFields.lname ,
				username : this.state.formFields.username ,
				email : this.state.formFields.email ,
				pwd : this.state.formFields.pwd ,
			}),
			});
			//clears the form
			let form = document.getElementById("signUpForm");
			form.reset();	
		}

	loginHandler = e => {
		e.preventDefault();
		//clears the form
		let form = document.getElementById("loginForm");
		form.reset();
		fetch('/login',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username1 : this.state.loginFields.username ,
				password1 : this.state.loginFields.password ,
			}),
		})
		.then(res => res.json())
		.then( (res) => {
			 console.log(res.value);
			 this.setState({
				isLoggedIn : res.value
			 });

			<Redirect to={{pathname:"/user"}} />;
			  //}
		});
			
			
			
	}
	//used to change the view between login and signup
	changeLogin = (e) => {
		var x = this.state.login;
		this.setState({
			login : !(x)
		})
	}

}

export default Login;