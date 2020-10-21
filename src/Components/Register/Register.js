import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			validUser: false
		}
	}
	firstNameChange = (event) => {
		this.setState({firstName: event.target.value});
	}
	lastNameChange = (event) => {
		this.setState({lastName: event.target.value});
	}
	emailChange = (event) => {
		this.setState({email: event.target.value});
	}
	passwordChange = (event) => {
		this.setState({password: event.target.value});
	}
	onRegister = () => {
		fetch('https://cryptic-cove-08776.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-type': 'Application/json'},
			body: JSON.stringify({
				name: this.state.firstName + ' ' + this.state.lastName,
				email: this.state.email,
				password: this.state.password
			})
		}).then(response => response.json())
		  .then(user => {
			if(user.id){
				this.props.theUser(user);
		  		this.props.Changeroute('home');
			}
			else{
				this.setState({validUser: true});
			}  
			})
	}
	render(){
		return(
			<div id = 'FormContainer'>
				<div id = 'Register'>
					<div id = 'Form'>
						<h1 id = 'heading'>WELCOME</h1>
						<input type = 'text' placeholder = 'First Name' id = 'fName' onChange = {this.firstNameChange} />
						<input type = 'text' placeholder = 'Last Name' id = 'lName' onChange = {this.lastNameChange} />
						<input type = 'email' placeholder = 'Email' id = 'email' onChange = {this.emailChange} />
						<input type = 'password' placeholder = 'Password' id = 'password' onChange = {this.passwordChange} />
						<div id = 'btnDiv'>
							<button id = 'btn' onClick = { this.onRegister }>Register</button>
							{ this.state.validUser && <div className = "errorMsg"><p>Please Re-check your form data!</p></div> }
							<p>Already have an account?</p>
							<p id = 'Sign' onClick = {() => {this.props.Changeroute('signin')}}>Login</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;