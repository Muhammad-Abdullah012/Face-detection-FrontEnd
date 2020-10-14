import React from 'react';
import './SearchBox.css';


const SearchBox = ({onInputChange}) =>
{
	return(
		<div className = 'SearchDiv'>
			<input type = 'text' className = 'SearchBox' onChange = {onInputChange}/>
		</div>
	);
}

export default SearchBox;