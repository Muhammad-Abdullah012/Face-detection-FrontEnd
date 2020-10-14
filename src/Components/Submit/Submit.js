import React from 'react';
import './Submit.css'
const Submit = ({onSubmit}) =>
{
	return(
		<div className = 'submitDiv'>
			<button className = 'Submit' onClick = {onSubmit}>{'Detect'}</button>
		</div>

		);
}

export default Submit;