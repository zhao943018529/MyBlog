import React from 'react';


export default class AccountView extends React.Component{

	componentWillMount(){
		if(this.props.login.status!=="IsLogin"){
			this.props.actions.push("/login");
		}
	}

	handleClick(path,event){
		event.preventDefault();
		this.props.actions.push(path);
	}

	render(){
		return (<div className="row">
					<nav className="col-2 bg-light d-none d-sm-block sidebar">
						<ul className="nav nav-pills flex-column">
							<li className="nav-item">
								<a className="nav-link active" onClick={this.handleClick.bind(this,'/account/addBlog')} href="#">
									新增博客
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link active" onClick={this.handleClick.bind(this,'/account/addTag')} href="#">
									Add Tag
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