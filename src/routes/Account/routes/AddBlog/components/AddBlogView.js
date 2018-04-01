import React from 'react';
import MediumDraftEditor from 'mydraft/MediumDraftEditor';
import 'medium-draft/lib/index.css';
import TagControl from 'controls/TagControl';
import 'whatwg-fetch';

export default class AddBlogView extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			status:'editing',
			message:'',
			tags:[],
			formData:{
				title:'',
				tagIds:[],
				content:'',
			}
		}

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleTagsChange = this.handleTagsChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSaveEditor = this.handleSaveEditor.bind(this);
	}

	componentDidMount(){
		fetch('/account/optTag/getTags').then(response=>response.json()).then(data=>{
			this.setState({
				tags:data.tags,
			});
		});
	}

	handleSubmit(event){

		return false;
	}

	handleTitleChange(event){
		let formData = this.state.formData;
		formData.title= event.target.value;
		this.setState({
			formData:formData,
		});
	}

	handleTagsChange(ids){
		let formData = this.state.formData;
		formData.tagIds = ids;
		this.setState({
			formData:formData,
		});
	}

	handleSaveEditor(data){
		let formData = this.state.formData;
		formData.content= data;
		this.setState({
			formData:formData
		});
	}

	render(){
		let {tags,formData,status,message}=this.state;
		if(status==='error'){

			return (<div className="alert alert-danger" role="alert">
  				{message}
			</div>);
		}else if(status==='success'){

			return (<div className="alert alert-success" role="alert">
  				{message}
			</div>);
		}else{
			return (
				<form onSubmit={this.handleSubmit}>
					<div className="form-group row">
					    <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
					    <div className="col-sm-10">
					      <input type="text" value={formData.title} onChange={this.handleTitleChange} className="form-control" id="title" placeholder="title..." />
					    </div>
					</div>
					<TagControl onValueChange={this.handleTagsChange} selected={formData.tagIds} tags={tags}/>
					<div className="form-group">
						<MediumDraftEditor onValueSave={this.handleSaveEditor}/>
					</div>
					<button type="button" className="btn btn-primary btn-lg">Submit</button>
				</form>
				);
		}
	}
}