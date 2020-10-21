import React from 'react';
import './Rank.css';

const Rank = ({user}) => {
	return(
			<div id = 'rank'>
				<h3>Hi {user.name}, Your current rank is {user.entries}.</h3>
				<p>Paste link of any image in below, it will detect any faces in it... Give it a try!</p>
			</div>
		);
}

export default Rank;