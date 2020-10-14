import React, { Component } from 'react';
import './SignInForm.css';

class SignInForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			password: '',
			email: '',
			validUser: false
		}
	}
	onMailChange = (event) => {
		this.setState({email: event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}
	onSubmit = () => {
		fetch('https://cryptic-cove-08776.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
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
		const {Changeroute} = this.props;
		return(
			<div id = 'FormContainer'>
				<div id = 'SignInForm'>
					<div id = 'Form'>
						<h1 id = 'heading'>WELCOME</h1>
						<input type = 'email' placeholder = 'Email' id = 'email' onChange = {this.onMailChange}/>
						<input type = 'password' placeholder = 'Password' id = 'password' onChange = {this.onPasswordChange}/>
						<div id = 'btnDiv'>
							<button id = 'btn' onClick = {this.onSubmit} >Sign In</button>
							{ this.state.validUser && <div className = "errorMsg"><p>Invalid Credentials!</p></div> }
							<p>Don't have account?</p>
							<p id = 'Reg' onClick = {() => {Changeroute('register')}}>Register here!</p>
						</div>
					</div>
				</div>
			</div>
			);
	}
}

export default SignInForm;