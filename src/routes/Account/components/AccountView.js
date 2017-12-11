import React from 'react';


export default class AccountView extends React.Component{

	handleClick(path,event){
		event.preventDefault();
		this.props.actions.push(path);
	}

	render(){
		return (<div className="row">
					<nav className="col-2 bg-light sidebar">
						<ul className="nav nav-pills flex-column">
							<li className="nav-item">
								<a className="nav-link active" onClick={this.handleClick.bind(this,'/account/addBlog')} href="#">
									新增博客
								</a>
							</li>
						</ul>
					</nav>
					<main className="col-9 pt-3 ml-sm-auto">
						{this.props.children}
					</main>
			</div>);
	}
}