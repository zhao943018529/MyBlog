import React from 'react';
import createRequest from '../../../reducers/request';


export default class RegisterView extends React.Component{
	
	constructor(props){
		super(props);
		this.state={};
		this.handleSubmit= this.handleSubmit.bind(this);
		this.handleChange= this.handleChange.bind(this);
	}

	handleSubmit(event) {
		let formData = this.state;
		this.props.actions.createRequest('/register', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		}, {
			start: this.props.actions.submit_start,
			success: this.props.actions.submit_success,
			failed: this.props.actions.submit_error
		});

		event.preventDefault();
	}

	handleChange(event) {
		let target = event.target;
		let formData = this.state || {};
		formData[target.name] = target.value;
		this.setState(formData);
	}

	render(){
		let validation;
		if(this.props.register.status==='Failed'){
			validation=(<div className="message">
				 {this.props.register.message}
				</div>);
		}else if(this.props.register.status==='Success'){
			this.props.actions.push('/login');
		}	
		return (
			<div className="setup-wrapper">
				{validation}
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="name">Nickname</label>
				    <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleChange} id="name" aria-describedby="nameHelp" placeholder="Enter nickname"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="username">Username</label>
				    <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleChange} id="username" aria-describedby="usernameHelp" placeholder="Enter username" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Email address</label>
				    <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
				    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Password</label>
				    <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} id="exampleInputPassword1" placeholder="Password"/>
				  </div>
				  <button type="submit" disabled={this.props.register.status==='Requesting'} className="btn btn-primary">Submit</button>
				</form>
			</div>	
			);
	}
}