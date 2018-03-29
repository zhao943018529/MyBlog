import React from 'react';
import {
  Editor,
  createEditorState,
} from 'medium-draft';
import MyImageSideButton from './MyImageSideButton';
import 'medium-draft/lib/index.css';


export default class AddBlogView extends React.Component{
	constructor(props) {
		super(props);
		this.sideButtons = [{
			title: 'Image',
			component: MyImageSideButton,
		}];

		this.state = {
			editorState: createEditorState(), // for empty content
		};

		/*
		this.state = {
		  editorState: createEditorState(data), // with content
		};
		*/

		this.onChange = (editorState) => {
			this.setState({
				editorState
			});
		};
	}

	componentDidMount() {
		this.refs.editor.focus();
	}
	
	render(){
		const { editorState } = this.state;
		return (
			<form>
			<div className="form-group row">
			    <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
			    <div className="col-sm-10">
			      <input type="text" className="form-control" id="title" placeholder="title..." />
			    </div>
			</div>
			<div className="form-group row">
			    <label htmlFor="category" className="col-sm-2 col-form-label">Category:</label>
			    <div className="col-sm-10">
				<select className="form-control" id="category" defaultValue="0">
			        <option value="0">Choose...</option>
			        <option value="1">One</option>
			        <option value="2">Two</option>
			        <option value="3">Three</option>
			     </select>
			    </div>
			</div>
				<div className="form-group">
				 	<Editor ref="editor" sideButtons={this.sideButtons} 
				 	        editorState={editorState} onChange={this.onChange} />
				</div>
			</form>
			);
	}
}