import React from 'react';


export default class TagManageView extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isExpanded:false,
			status:'showAll',
			tag:undefined,
		};
		this.model=null;
	}
	
	componentDidMount(){
	    this.props.actions.createRequest('/account/optTag/getTags', {
			credentials: 'same-origin'
			}, {
				start: this.props.actions.fetch_tags_start,
				success: this.props.actions.fetch_tags_success,
				failed: this.props.actions.fetch_tags_error
			});
	}

	createTagNodes(){

		return (<div className="d-flex justify-content-between flex-wrap">
				{this.props.tag.tags.map(tag=>this.createTagNode(tag))}
			</div>);
	}

	handleClickCovered(event){
		if(this.model===event.target){
			this.handleModel(false,'showAll',event);
		}
	}

	handleModel(isExpanded,status,event){
		this.setState({
			isExpanded:isExpanded,
			status:status
		});
		event.stopPropagation();
	}

	createModel(){
		let {isExpanded,status,tag} = this.state;
		let title;
		let hideInput;
		if(status=='add'){
			title='Add Tag';
		}else{
			title='Update Tag';
			hideInput = <input type="hidden" name="id" />
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
					<form name="TagForm" className="needs-validation">
						{hideInput}
						<div className="mb-3">
			              <label htmlFor="name">Name</label>
			              <input type="text" className="form-control" name="name" id="name" placeholder="TagName" required />
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

	handleSubmit(event){
		let myForm = document.forms['TagForm'];
		let elems = myForm.elements;
		let data = {};
		let url;
		let tagValue;
			
		if(this.state.status==='update'){
			tagValue=elems[1].value.trim();
			data[elems[1].name]=tagValue;
			url='/account/optTag/update';
			data[elems[0].name]=elems[0].value;
		}else{
			tagValue=elems[0].value.trim();
			data[elems[0].name]=tagValue;
			url='/account/optTag/add';
		}

		if(tagValue.length>0){
			this.props.actions.createRequest(url,
				{
					method: 'POST',
					headers: {
					    'Accept': 'application/json',
					    'Content-Type': 'application/json'
					},
					body:JSON.stringify(data)
				},
				{
					success:this.props.actions.add_tag_success,
					failed:this.props.actions.add_tag_error
				});
		}else{
			myForm.classList.add('was-validated');
		}

		event.stopPropagation();
	}

	createTagNode(tag){

		return (
			<div key={tag.id} className="card" style={{width: '18rem'}}>
			  <div className="card-body">
			    <h5 className="card-title">{tag.name}</h5>
			    <a href="#" className="card-link">Tag Edit</a>
			    <a href="#" className="card-link">Tag Del</a>
			  </div>
			</div>
			)
	}

	createCovert(){
	
		return (<div className="modal-backdrop fade show"></div>);
	}
	
	createAddTagButton(){
		
		return (<div key="add-tag-button" className="add-tag-button" onClick={this.handleModel.bind(this,'true','add')}>
			<i className="fa fa-plus-circle"></i>
		</div>)
	}

	render(){
		let covert = this.state.isExpanded?this.createCovert():undefined;

		return (
				<div className={"tag-container "+(this.state.isExpanded&&"modal-open":"")}>
					<div className="d-flex pb-2 mb-3 border-bottom">
						<h1 className="h2">Tag Management</h1>
					</div>	
					{this.createTagNodes()}
					{this.createAddTagButton()}
					{this.createModel()}
					{covert}
				</div>
			);
	}
}