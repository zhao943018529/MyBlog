import React from 'react';
import createRequest from '../../';


export default class RegisterView extends React.Component{
	
	constructor(props){
		super(props);
		this.handleSubmit= this.handleSubmit.bind(this);
		this.handleChange= this.handleChange.bind(this);
		this.state={
			status:'registing',
			message:'',
			formData:{

			}
		}
	}

	handleSubmit(event){
		let fd = new FormData();
		let formData = this.state.formData;
		let keys = Object.keys(formData);
		keys.forEach(key=>{
			fd.append(key,formData[key]);
		});

		fetch('/register',{
			method:'POST',
			body:fd
		}).then(function(response){
			if (response.status >= 200 && response.status < 300) {
				return response
			} else {
				let error = new Error(response.statusText)
				error.response = response
				throw error;
			}
		}).then(function(response){
			return response.json();
		}).then(function(data){
			if(data.type==400){
				let state=this.state;
				state.status="validateErr";
				state.message=data.message;
				this.setState(state);
			}else{
				this.props.actions.push('/login');
			}
		}).catch(function(error){
			let state = this.state;
			state.status= "ServerErr";
			state.message=error.response;
			this.setState(state);
		});
		event.preventDefault();
	}

	handleChange(event){
		let target = event.target;
		let formData = this.state.formData;
		formData[target.name]=target.value;
		this.setState({
			formData:formData
		});
	}

	render(){
		let validation;
		if(this.state.status==='validateErr'||this.state.status==='serverErr'){
			validation=(<div className="message">
				 {this.state.message}
				</div>);
		}	
		return (
			<div className="setup-wrapper">
				{validation}
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label htmlFor="name">Nickname</label>
				    <input type="text" name="name" className="form-control" value={this.state.formData.name} onChange={this.handleChange} id="name" aria-describedby="nameHelp" placeholder="Enter nickname"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="username">Username</label>
				    <input type="text" name="username" className="form-control" value={this.state.formData.username} onChange={this.handleChange} id="username" aria-describedby="usernameHelp" placeholder="Enter username" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Email address</label>
				    <input type="email" name="email" className="form-control" value={this.state.formData.email} onChange={this.handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
				    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Password</label>
				    <input type="password" name="password" className="form-control" value={this.state.formData.password} onChange={this.handleChange} id="exampleInputPassword1" placeholder="Password"/>
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>	
			);
	}
}