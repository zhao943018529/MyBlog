import React from 'react';



export default class TagControl extends React.Component{

	constructor(props){
		super(props);

		this.state={
			isExpanded:false,
			value:'',
		};

		this.setInput=ele=>this.input=ele;
		this.focus= () =>this.input.focus();
		this.handleFocusInput= this.handleFocusInput.bind(this);
		this.handleBlurEvent = this.handleBlurEvent.bind(this);
		this.handleEnterForTag = this.handleEnterForTag.bind(this);
	}

	isContain(parent,child){
		let current = child;
		while(current){
			if(current===parent)return true;
			current=current.parentNode;
		}

		return false;
	}

	handleFocusInput(event){
		let isExpanded = this.state.isExpanded;
		if(!isExpanded){
			this.focus();
			this.setState({
				isExpanded:true
			});
		}

		event.stopPropagation();
	}

	handleEnterForTag(event){
		if(event.keyCode===13){
			let {value} = this.state;
			let {tags,selected} = this.props;
			if(value&&(value=value.trim())){
				let reg = new RegExp(value,"ig");
				let tag = tags.find(tag=>reg.test(tag.name));
				if(tag){
					selected.push(tag.id);
					this.setState({
						value:'',
					},()=>this.props.onValueChange(selected));
				}
			}
			event.preventDefault();
		}

		event.stopPropagation();
	}

	createPlaceholder(){
		let {tags,selected}= this.props;
		let {value} = this.state;
		let selectdTags = tags.filter(tag=>selected.includes(tag.id));
		let tagElems = selectdTags.map(tag=>this.createSelectedTag(tag));
		return (
			<div className="typehelper-fortags" onClick={this.handleFocusInput}>
				{tagElems}
			   	<input name="tag" onKeyDown={this.handleEnterForTag} onChange={event=>this.setState({value:event.target.value})} type="text" value={value} ref={(elem)=>this.setInput(elem)} className="typehelper-fortags-input"  placeholder="tag,for example:php,you can use [,;] split"/>
			</div>
			);
	}
	
	handleRemoveTag(id,event){
		let selected = this.props.selected;
		let index = selected.findIndex(value=>value===id);
		selected.splice(index,1);
		this.props.onValueChange(selected);

		event.stopPropagation();
	}

	createSelectedTag(tag){

		return (
			<span key={tag.id} tabIndex="0" className="typehelper-item">
			      {tag.name}
			      <span onClick={this.handleRemoveTag.bind(this,tag.id)}>×</span>
			</span>
		);
	}

	createTabContent(){
		let tags = this.props.tags;
		let {isExpanded} = this.state;
		let tagElems = tags.map(tag=>this.createTabItem(tag));

		return (
			<div className={isExpanded?"tab-content":"tab-content d-none"} ref={elem=>{
				if(elem){
					let left = this.input.offsetLeft;
					elem.style.left=left-10+"px";
				}
			}}>
			    <ul className="taglist-inline">
			    	{tagElems}
			   	</ul>
		  	</div> 
			);
	}
	
	handleSelectTag(id,event){
		let { selected } = this.props;
		if (!selected.includes(id)) {
			selected.push(id);
			this.props.onValueChange(selected);
		}

		event.stopPropagation();
	}

	createTabItem(tag){
		let {selected} = this.props;
		let isActive = selected.includes(tag.id);

		return (<li key={tag.id} className="mb-1"><a className={isActive?"tag active":"tag"} onClick={this.handleSelectTag.bind(this,tag.id)} href="javascript: void(0);">{tag.name}</a></li>);
	}

	handleBlurEvent(event){
		let target = event.currentTarget;
		let related = event.relatedTarget;
		if(!this.isContain(target,related)){
			this.setState({
				isExpanded:false
			});
		}

		event.stopPropagation();
	}

	render(){
		let placeholder = this.createPlaceholder();
		let content = this.createTabContent();

		return (<div className="form-group position-relative" onBlur={this.handleBlurEvent}>
			{placeholder}
			{content}
		</div>);
	}

}