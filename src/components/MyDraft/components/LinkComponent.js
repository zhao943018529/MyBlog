import React from 'react';

export default class LinkComponent extends React.Component{

	render(){
		let {entityKey,contentState} = this.props;
		let url = contentState.getEntity(entityKey).getData().url;

		return (<a href={url} style={{
          color: '#3b5998',
          textDecoration: 'underline',
        }}>
				{this.props.children}
			</a>);
	}
}