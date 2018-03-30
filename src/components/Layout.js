import React from 'react';
import Header from './Header';

export default ({children,location})=>(
		<div>
			<Header location={location}/>
			{children}
		</div>
	)