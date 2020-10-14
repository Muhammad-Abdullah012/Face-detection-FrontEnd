import React from 'react';
import './SignInOut.css';
const SignInOut = ({Changeroute}) =>
{
	return(
		<h4 className = 'SignOut' onClick = {() => { Changeroute('signin') }} >Sign Out!</h4>
		);
}
export default SignInOut;