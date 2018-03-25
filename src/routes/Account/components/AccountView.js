import React from 'react';


export default class AccountView extends React.Component{

	componentWillMount(){
		if(this.props.user.status!=="Success"){
			this.props.actions.push("/login");
		}
	}

	handleClick(path,event){
		event.preventDefault();
		this.props.actions.push(path);
	}

	render(){
		let regex = /(?:\/\w*)*(\/\w*)$/;
		let pathname =this.props.location.pathname.match(regex)[1];
		return (<div className="row">
					<nav className="col-2 bg-light d-none d-sm-block sidebar">
						<ul className="nav nav-pills flex-column">
							<li className="nav-item">
								<a className={"nav-link "+(pathname=='/addBlog'&&'active')} onClick={this.handleClick.bind(this,'/account/addBlog')} href="#">
									新增博客
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