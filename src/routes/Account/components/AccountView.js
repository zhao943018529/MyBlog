import React from 'react';


export default class AccountView extends React.Component{

	handleClick(path,event){
		event.preventDefault();
		this.props.push(path);
	}

	render(){
		let regex = /(?:\/\w*)*(\/\w*)$/;
		let pathname =this.props.location.pathname.match(regex)[1];
		return (<div className="row">
					<nav className="col-2 bg-light d-none d-sm-block sidebar">
						<ul className="nav nav-pills flex-column">
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
					<main className="col-10 pt-3 ml-sm-auto">
						{this.props.children}
					</main>
			</div>);
	}
}