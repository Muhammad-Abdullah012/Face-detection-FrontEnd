import React from 'react';
import './Rank.css';

const Rank = ({user}) => {
	return(
			<div id = 'rank'>
				<h3>Hi {user.firstName + " " + user.lastName}, Your current rank is {user.entries}.</h3>
			</div>
		);
}

export default Rank;