import React from 'react';
import MediumDraftEditor from 'mydraft/MediumDraftEditor';
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



	render(){
		let {status,article,message}  = this.state;
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
			</div>
			);
	}
}