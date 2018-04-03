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
				tags:[],
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
		let formData = this.state.formData;
		fetch('/article/add', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		}).then((response)=>response.json()).then(response=>{
			if(response.status!=200){
				throw new Error(response.message);
			}

			return response;
		}).then(data=>{
			this.setState({
				status: 'success',
				formData: {
					title: '',
					tags: [],
					content: '',
				},
				message: ''
			});
		}).catch((error)=>{
			this.setState({
				status: 'error',
				message:error.message,
			});
		});
		event.preventDefault();
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
		formData.tags = ids;
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
					<div className="form-group">
					    <label htmlFor="title">Title:</label>
					    <input type="text" value={formData.title} onChange={this.handleTitleChange} className="form-control" id="title" placeholder="title..." />
					</div>
					<div className="form-group">
						<TagControl onValueChange={this.handleTagsChange} selected={formData.tags} tags={tags}/>
					</div>
					<div className="form-group">
						<MediumDraftEditor editorEnabled={true} content={formData.content} onValueSave={this.handleSaveEditor}/>
					</div>
					<button type="submit" className="btn btn-primary btn-lg">Submit</button>
				</form>
				);
		}
	}
}