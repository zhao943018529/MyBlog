import React from 'react';
import MyDraft from 'root/components/MyDraft'


export default class AddBlogView extends React.Component{
	
	render(){
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
				<MyDraft />
			</div>
			</form>
			);
	}
}