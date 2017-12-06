import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {fetch_user_success,fetch_user_start,fetch_user__error} from '../reducers/UserReducer';
import createRequest from '../reducers/request';

class Header extends React.Component{
	constructor(props){
		super(props);
		this.state={expanded:false};
		this.handleClick=this.handleClick.bind(this);
	}

	componentWillMount(){
		createRequest('/user/getUser',{},{
			start:this.props.actions.fetch_user_start,
			success:this.props.actions.fetch_user_success,
			failed:this.props.actions.fetch_user_error
		})
	}

	handleClick(event){
		this.setState({expanded:!this.state.expanded});
	}

	handleRoute(path,event){
		event.preventDefault();
		console.log(this.props.actions);
		this.props.actions.push(path);
	}

	render(){
		let expanded = this.state.expanded;
		let btnProps={
			className:expanded?"navbar-toggler":"navbar-toggler collapsed",
			onClick:this.handleClick
		}

		let navbarProp = {
			className:expanded?"collapse navbar-collapse show":"collapse navbar-collapse"
		}
		let loginInfo;
		if(this.props.login.status==='IsLogin'){
			loginInfo= (<a class="nav-link active" onClick={this.handleRoute.bind(this,'/account')} href="#">{this.props.login.user.name}</a>);
		}else{
			loginInfo=(<div className="btn-group" role="group" aria-label="Button group">
		    	<button type="button" onClick={this.handleRoute.bind(this,'/login')} className="btn btn-primary">Login</button>
		    	<button type="button" onClick={this.handleRoute.bind(this,'/register')} className="btn btn-outline-warning">Register</button>
		    </div>);
		}
		return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
		  <a className="navbar-brand" href="#">ZCC</a>
		  <button {...btnProps} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span className="navbar-toggler-icon"></span>
		  </button>

		  <div {...navbarProp} id="navbarSupportedContent">
		    <ul className="navbar-nav mr-auto">
		      <li className="nav-item active">
		        <a className="nav-link" onClick={this.handleRoute.bind(this,'/home')} href="#">Home <span className="sr-only">(current)</span></a>
		      </li>
		      <li className="nav-item">
		        <a className="nav-link" href="#">Link</a>
		      </li>
		      <li className="nav-item dropdown">
		        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		          Dropdown
		        </a>
		        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
		          <a className="dropdown-item" href="#">Action</a>
		          <a className="dropdown-item" href="#">Another action</a>
		          <div className="dropdown-divider"></div>
		          <a className="dropdown-item" href="#">Something else here</a>
		        </div>
		      </li>
		      <li className="nav-item">
		        <a className="nav-link disabled" href="#">Disabled</a>
		      </li>
		    </ul>
		    <form className="form-inline my-2 my-lg-0">
		      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
		      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
		    </form>
		    {loginInfo}
		  </div>
		</nav>
			);
	}
}

const mapStateToProps = state=>({
	login:state.login
});

export default connect(mapStateToProps, dispatch => ({
	actions: bindActionCreators({
		push: push,
		fetch_user_success,
		fetch_user_start,
		fetch_user__error
	}, dispatch)
}))(Header);