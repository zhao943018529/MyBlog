import React from 'react';
import {fetch_tags_success,
	fetch_tags_start,
	fetch_tags_error,
	add_tag_success,
	add_tag_error,
	del_tag_success,
	del_tag_error} from '../../../../../reducers/TagReducer';


export default class TagManageView extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isExpanded:false,
			status:'showAll',
			message:undefined,
			requestStatus:undefined,
			tag:undefined,
			inputValue:'',
		};
		this.model=null;
	}
	
	componentDidMount(){
		this.updateTags();
	}

	updateTags(){
		this.setState({
			message:undefined,
			requestStatus:undefined,
		});
		
		this.props.createRequest('/account/optTag/getTags', {
			credentials: 'same-origin'
			}, {
				start: fetch_tags_start,
				success: fetch_tags_success,
				failed: fetch_tags_error
			});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.tag.status==='failed'){
			this.setState({
				message:nextProps.tag.message,
				requestStatus:nextProps.tag.status
			});
		}else{
			this.setState({
				message:nextProps.tag.message,
				requestStatus:nextProps.tag.status
			});
		}
	}

	createTagNodes(){
		let tags = this.props.tag.tags;
		return (<div className="d-flex justify-content-between flex-wrap">
				{tags.map(tag=>this.createTagNode(tag))}
			</div>);
	}

	handleClickCovered(event){
		if(this.model===event.target){
			this.handleModel(false,'showAll',event);
		}
	}

	handleModel(isExpanded,status,event){
		if(!isExpanded){
			this.updateTags();
		}

		this.setState({
			isExpanded:isExpanded,
			message:undefined,
			status:status,
			requestStatus:undefined
		});
		event.stopPropagation();
	}

	createModel(){
		let {isExpanded,status,message,requestStatus,inputValue} = this.state;
		let title;
		let hideInput;
		if(status=='add'){
			title='Add Tag';
		}else if(status=='update'){
			title='Update Tag';
			//hideInput = <input type="hidden" name="id" value={tag.id} />
		}


		let props ={
			key:"opt-tag-model",
			className:"modal fade "+(isExpanded&&'show'),
			tabIndex:-1,
			role:"dialog",
			"aria-labelledby":"tagModalCenterTitle",
			"aria-hidden":!isExpanded,
			ref:element=>{
				this.model=element;
			},
			style:{display:isExpanded?'block':'none'},
			onClick:event=>this.handleClickCovered(event)
		};

		let msgEle;
		if(requestStatus==='failed'){
			msgEle=(<div className="alert alert-danger" role="alert">
					<h5 className="alert-heading">Failed!</h5>
					<p>{message}</p>
			</div>)

		}else if(requestStatus==='success'){
			msgEle=(<div className="alert alert-success" role="alert">
					<h5 className="alert-heading">Success</h5>
					<p>{message}</p>
			</div>)
		}
		return (
			<div {...props}>
			  <div className="modal-dialog modal-dialog-centered" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title">{title}</h5>
			        <button type="button" onClick={this.handleModel.bind(this,false,'showAll')} className="close" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        {msgEle}
					<form name="TagForm" className="needs-validation">
						{hideInput}
						<div className="mb-3">
			              <label htmlFor="name">Name</label>
			              <input type="text" onChange={this.updateInputValue.bind(this)} className="form-control" name="name" id="name" value={inputValue}  placeholder="TagName" required />
			              <div className="invalid-feedback" style={{width: '100%'}}>
			                Your username is required.
			              </div>
			            </div>
					</form>
			      </div>
			      <div className="modal-footer">
			        <button type="button" onClick={this.handleModel.bind(this,false,'showAll')} className="btn btn-secondary" >Close </button>
			        <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-primary">Save changes</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}

	updateInputValue(event){
		this.setState({inputValue:event.target.value});
		event.preventDefault();
	}

	handleSubmit(event){
		let data = {};
		let url;
		let {inputValue,tag} =this.state;
			
		if(this.state.status==='update'){
			url='/account/optTag/update';
			data.id=tag.id;
		}else{
			url='/account/optTag/add';
		}
		data.name=inputValue;

		if(inputValue.length>0){
			this.props.createRequest(url,
				{
					method: 'POST',
					headers: {
					    'Accept': 'application/json',
					    'Content-Type': 'application/json'
					},
					body:JSON.stringify(data)
				},
				{
					success:add_tag_success,
					failed:add_tag_error
				});
		}else{
			myForm.classList.add('was-validated');
		}

		event.stopPropagation();
	}

	createTagNode(tag){

		return (
			<div key={tag.id} className="card" style={{width: '18rem',marginBottom:'6px'}}>
			  <div className="card-body">
			    <h5 className="card-title">{tag.name}</h5>
			    <a href="#" onClick={this.handleEditTag.bind(this,tag)} className="card-link">Tag Edit</a>
			    <a href="#" onClick={this.handleDelTag.bind(this,tag.id)} className="card-link">Tag Del</a>
			  </div>
			</div>
			);
	}
	
	handleEditTag(tag,event){
		this.setState({
			tag:tag,
			isExpanded:true,
			status:'update',
			requestStatus:undefined,
			message:undefined,
			inputValue:tag.name,
		});
		event.preventDefault();
		event.stopPropagation();
	}

	handleDelTag(id,event){
		this.setState({
			requestStatus:undefined,
			message:undefined,
		});

        this.props.createRequest('/account/optTag/del/'+id, {
			credentials: 'same-origin'
			}, {
				success: del_tag_success,
				failed: del_tag_error,
				aftersuc:()=>this.updateTags(),
			});
		event.preventDefault();
		event.stopPropagation();
	}
	
	createCovert(){
	
		return (<div className="modal-backdrop fade show"></div>);
	}
	
	createAddTagButton(){
		
		return (<div key="add-tag-button" className="add-tag-button" onClick={this.handleModel.bind(this,'true','add')}>
			<i className="fa fa-plus-circle"></i>
		</div>);
	}
	
	render(){
		let {isExpanded,message,requestStatus} = this.state;
		let covert = isExpanded?this.createCovert():undefined;
		let msgBar;
		let subool = requestStatus==='success';
		let errbool = requestStatus==='failed';
		if(!isExpanded&&(subool||errbool)){
			let tipProps={
				className:subool?"alert alert-success":"alert alert-danger",
				role:"alert",
				ref:ele=>{
					if(ele){
						let tid = setTimeout(()=>{
							ele.classList.add('d-none');
							clearTimeout(tid);
						},2000);
						
					}
				}
			};
			msgBar=(
				<div {...tipProps}>
				  {message}
				</div>
			);
		}

		return (
				<div className={"tag-container "+(isExpanded&&"modal-open":"")}>
					<div className="d-flex pb-2 mb-3 border-bottom">
						<h1 className="h2">Tag Management</h1>
					</div>
					{msgBar}	
					{this.createTagNodes()}
					{this.createAddTagButton()}
					{this.createModel()}
					{covert}
				</div>
			);
	}
}