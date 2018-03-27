import React from "react";
//import createRequest from "../../../reducers/request";
import {submit_success,submit_start,submit_error} from '../../../reducers/SubmitReducer';

export default class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {fomData:{}};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount(){
		if (this.props.user.status === "Success") {
			this.props.push("/account");
		}
	}

	componentDidUpdate(){
		if (this.props.login.status === "Success") {
			this.props.push("/");
		}
	}

	handleSubmit(event) {
		let formData = this.state.formData;
		this.props.createRequest(
			"/login",
			{
				method: "POST",
				credentials: 'same-origin',
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			},
			{
				start: submit_start,
				success: submit_success,
				failed: submit_error
			}
		);

		event.preventDefault();
	}

	handleChange(event) {
		let target = event.target;
		let formData = this.state.formData || {};
		formData[target.name] = target.value;
		this.setState({formData:formData});
	}

	render() {
		let validation;
		if (this.props.login.status === 'Failed') {
			validation = (
				<div className="message">{this.props.login.message}</div>
			);
		}

		return (
			<div className="setup-wrapper">
				<div className="h2">Login</div>
				{validation}
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							className="form-control"
							value={this.state.username}
							onChange={this.handleChange}
							id="username"
							aria-describedby="usernameHelp"
							placeholder="Enter username"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Password</label>
						<input
							type="password"
							name="password"
							className="form-control"
							value={this.state.password}
							onChange={this.handleChange}
							id="exampleInputPassword1"
							placeholder="Password"
						/>
					</div>
					<button type="submit" disabled={this.props.login.status==='Requesting'} className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}
