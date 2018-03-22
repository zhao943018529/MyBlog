import React from 'react';

const AnnotationComponent = props=>{

	return (<span className ="hljs-comment" data-offset-key={props.offsetKey}>{props.children}</span>);
} 

export default AnnotationComponent;