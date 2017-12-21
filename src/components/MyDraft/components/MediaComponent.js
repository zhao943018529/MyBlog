import React from 'react';
import Image from './Image';


export default class MediaComponent extends React.Component{

	render(){
		let {block,contentState} = this.props;
		let entity = contentState.getEntity(block.getEntityAt(0))
		let type = entity.getType();
		let {src} =entity.getData();	
		let media;
		if(type==='IMAGE'){
			media = <Image src={src} />;
		}

		return media;
	}
}