import React from 'react';
import MediumDraftEditor from 'mydraft/MediumDraftEditor';
import CommentCotrol from 'controls/CommentCotrol';
import 'whatwg-fetch'


export default class ArticleView extends React.Component{
	constructor(props){
		super(props);
		this.state={
			article:undefined,
			status:'loading',
			message:'',
		};
	}

	componentWillMount(){
		let aid = this.props.params.id;
		if(aid){
			fetch('/article/getById/'+aid).then(response=>response.json())
			.then(data=>{
				if(data.status==200){
					this.setState({
						status:'success',
						article:data.article,
					});
				}else{
					throw new Error(data.message);
				}
			}).catch(err=>{
				this.setState({
					status:'error',
					message:err.message
				});
			});
		}else{
			this.props.push('/');
		}
		
	}

	induceToLoginOrRegister(path,event){
		this.props.push(path);
		event.stopPropagation();
	}

	render(){
		let {status,article,message}  = this.state;
		console.log(article);
		let uStatus = this.props.user.status;
		let comment;
		if(uStatus==='Success'){
			let action = `/article/${this.props.params.id}/comment/add`;
			comment = <CommentCotrol action={action}/>;
		}else{
			comment=(
				<div className="btn-group" role="group" aria-label="sign in or sign up">
					<button type="button" onClick={this.induceToLoginOrRegister.bind(this,'/login')} className="btn btn-link">Sign in</button>
					or
					<button type="button" onClick={this.induceToLoginOrRegister.bind(this,'/register')} className="btn btn-link">Sign up</button>
				</div>
			);
		}
		let msgBar;
		let content;
		if(status==='error'){
			msgBar=(<div className="alert alert-danger" role="alert">
				{message}
			</div>);
		}else if(status==='loading'){
			msgBar=(<div className="alert alert-info" role="alert">
			  loading...
			</div>);
		}else{
			content = (<MediumDraftEditor editorEnabled={false} content={article.content} />);
		}

		return (
			<div className="container">
				{msgBar}
				{content}
				{comment}
			</div>
			);
	}
}