import React from "react";
import createRequest from "../../../reducers/request";

export default class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount(){
		if (this.props.user.status === "Success") {
			this.props.actions.push("/account");
		}
	}

	componentWillUpdate(nextProps){
		if (nextProps.login.status === "Success") {
			nextProps.actions.push("/");
		}
	}

	handleSubmit(event) {
		let formData = this.state;
		this.props.actions.createRequest(
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
				start: this.props.actions.submit_start,
				success: this.props.actions.submit_success,
				failed: this.props.actions.submit_error
			}
		);

		event.preventDefault();
	}

	handleChange(event) {
		let target = event.target;
		let formData = this.state || {};
		formData[target.name] = target.value;
		this.setState(formData);
	}

	render() {
		let validation;
		if (
			this.props.login.status === 'Failed') {
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
