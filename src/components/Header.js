import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {fetch_user_success,fetch_user_start,fetch_user_error}  from '../reducers/UserReducer';
import createRequest from '../reducers/request';

class Header extends React.Component{
	constructor(props){
		super(props);
		this.state={expanded:false};
		this.handleClick=this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps){
		console.log(this.props.location);
		if(this.props.location.pathname!==nextProps.location.pathname){
			this.props.createRequest('/user/getUser', {
				credentials: 'same-origin'
			}, {
				start: fetch_user_start,
				success: fetch_user_success,
				failed: fetch_user_error
			});
		}

		if(/\/account/.test(nextProps.location.pathname)&&nextProps.user.status!=='Success'&&nextProps.user.status!=='Requesting'){
			this.props.push('/login');
		}

		if(nextProps.location.pathname==='/login'&&nextProps.user.status==='Success'){
			this.props.push('/');
		}
	}

	componentWillMount(){
		this.props.createRequest('/user/getUser', {
			credentials: 'same-origin'
		}, {
			start: fetch_user_start,
			success: fetch_user_success,
			failed: fetch_user_error
		});
	}

	handleClick(event){
		this.setState({expanded:!this.state.expanded});
	}

	handleRoute(path,event){
		console.log(this.props);
		this.props.push(path);
		event.preventDefault();
		event.stopPropagation();
	}

	handleToggleUserOperations(event){
		let target = event.currentTarget;
		let rect = target.getBoundingClientRect();
		let panel = target.lastElementChild;
		panel.style.right=0+"px";
		panel.style.top=rect.height+"px";
		panel.style.zIndex=1000;
		panel.classList.toggle('d-none');
		event.preventDefault();
		event.stopPropagation();
	}

	handleBlurUserOperations(event){
		let container = event.currentTarget;
		let target = event.relatedTarget||document.activeElement;
		if(!this.isContain(container,target)){
			container.lastElementChild.classList.add('d-none');
		}
		
		event.stopPropagation();
	}

	isContain(parent,child){
		let current = child.parentNode;
		while(current){
			if(current===parent)return true;
			current=current.parentNode;
		}

		return false;
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
		if(this.props.user.status==='Success'){
			loginInfo= (<ul className="navbar-nav ml-autoflex-row d-flex">
				<li className="nav-item position-relative" tabIndex="0" onClick={this.handleToggleUserOperations.bind(this)} onBlur={this.handleBlurUserOperations.bind(this)}>
      				<a className="nav-link p-2" href="#"><i className="fa fa-plus" aria-hidden="true"></i></a>
      				<ul className="list-group d-none position-absolute text-nowrap">
					  <li className="list-group-item" tabIndex="0" onClick={this.handleRoute.bind(this,'/account')}>Write Blog</li>
					</ul>
    			</li>
				<li className="nav-item">
      				<a className="nav-link p-2" onClick={this.handleRoute.bind(this,'/account')} href="#">{this.props.user.user.name}</a>

    			</li>
		    </ul>);
		}else{
			loginInfo=(<ul className="navbar-nav ml-autoflex-row d-flex">
				<li className="nav-item">
      				<a className="nav-link p-2" onClick={this.handleRoute.bind(this,'/login')} href="#">Login</a>
    			</li>
    			<li className="nav-item">
      				<a className="nav-link p-2" onClick={this.handleRoute.bind(this,'/register')} href="#">Register</a>
    			</li>
		    </ul>);
		}
		return (
		<nav className="navbar navbar-expand-md navbar-light bg-light">
		  <a className="navbar-brand" href="#">ZCC</a>
		  <button {...btnProps} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span className="navbar-toggler-icon"></span>
		  </button>

		  <div {...navbarProp} id="navbarSupportedContent">
		    <ul className="navbar-nav">
		      <li className="nav-item active">
		        <a className="nav-link" onClick={this.handleRoute.bind(this,'/')} href="#">Home <span className="sr-only">(current)</span></a>
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
		  </div>
			{loginInfo}
		</nav>
			);
	}
}

const mapStateToProps = state=>({
	user:state.user
});

export default connect(mapStateToProps, {
		push: push,
		createRequest
	})(Header);