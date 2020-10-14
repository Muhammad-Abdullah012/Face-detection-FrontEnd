import React from 'react';
import './Image.css';
const Image = ({ box, searchField }) =>
{	
	if(Object.keys(box).length !== 0)
	{
		const Faces = box.map((face, i) => {
			return <div key = {i} className = 'Box' style = {{left: box[i].leftCol, top: box[i].topRow, width: box[i].width, height: box[i].height }}></div>
		})
		return(
			<div className = 'imgDiv'>
				<img id = 'image' alt = 'Pic' src = {searchField} className = 'Pic'/>
				{
					Faces		
				}
			</div>
		);
	}
	else{
		return(
			<div className = 'imgDiv'>
				<img id = 'image' alt = 'Pic' src = {searchField} className = 'Pic'/>
			</div>
		);	
	}
		

}

export default Image;