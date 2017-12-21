import React from 'react';


export default class StyleButton extends React.Component{

	constructor(props){
		super(props);
		this.onToggle=(e)=>{
			e.preventDefault();
			this.props.onToggle(this.props.style);
		}
	}

	render(){
		let className= 'editor-item';
		if(this.props.active){
			className+=' editor-active';
		}
		 let label = this.props.className?(<i className={this.props.className} aria-hidden="true"></i>):this.props.label;
		return (
			<span onMouseDown={this.onToggle} className={className} title={this.props.label}>
				{label}
			</span>
			);
	}
}