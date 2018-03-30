import React from 'react';


export default class AccountView extends React.Component{

	handleClick(path,event){
		event.preventDefault();
		this.props.push(path);
	}

	render(){
		let regex = /(?:\/\w*)*(\/\w*)$/;
		let pathname =this.props.location.pathname.match(regex)[1];
		return (<div className="container-fluid mt-1">
					<nav className="navbar navbar-light bg-light">
						<ul className="nav nav-pills">
							<li className="nav-item">
								<a className={"nav-link "+(pathname=='/addBlog'&&'active')} onClick={this.handleClick.bind(this,'/account/addBlog')} href="#">
									Add Blog
								</a>
							</li>
							<li className="nav-item">
								<a className={"nav-link "+(pathname=='/optTag'&&'active')} onClick={this.handleClick.bind(this,'/account/optTag')} href="#">
									Tag Operation
								</a>
							</li>
						</ul>
					</nav>
					<div className="container mt-2">
						{this.props.children}
					</div>
			</div>);
	}
}