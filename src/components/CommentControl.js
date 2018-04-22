import React from 'react';



export default class CommentControl extends React.Component{
	constructor(props){
		super(props);
		this.state={
			editing:false,
			comment:'',
		}
	}

	createCommentUser(){
        let {comment} = this.props;     
		return (
			<div className="comment-trigger">
		      <div className="comment-user">
		        <strong>{comment.author.username}</strong>
		      </div>
		      <div className="comment-content">
		        <p>{comment.message}</p>
		      </div>
		    </div>
			);
	}
	
	createCommentReply(reply){

		return (<li className="comment-replyitem">
			   <div className="comment-content">
			    <p>{reply.message}</p>
			  </div>
			  <div className="reply-user">
			    <span className="reply-tip"> — </span><strong>{reply.author.name}</strong>
			  </div>
			</li>);
	}

	createCommentReplyList(){
		let replyList = this.props.replyList||[];

		return (
			<div className="comment-reply">
		       <ul className="comment-replylist">
					{replyList.map(item=>this.createCommentReply(reply))}
		      </ul>
		    </div>
			);
	}
	
	handleSubmit(event){
		let content = this.state.content;
		let {comment,currentUser,articleId} = this.props;
		let data = {
			message:content,
			respondTo:comment.author.id,
			author:currentUser.id,
			article:articleId,
		}

		console.log(data);
		event.preventDefault();
	}

	handleValueChange(event){
		this.setState({
			comment:event.target.value,
		});
	}
	
	createReplyForm(){
		let comment = this.state.comment;
		let style={
			minHeight: '35px',
			maxHeight: '132px',
			overflow: 'hidden',
			wordWrap: 'break-word',
			height: '32px',
		};

	    return (
				<form className="reply-form" action="#" >
					<div className="pull-right" role="group">
				  		<button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-outline-primary">Reply</button>
				  		<button type="button" onClick={this.onClickReply.bind(this,false)} className="btn btn-light">Cancel</button>
				    </div>
	                <div className="form-group">
	                    <textarea style={style} name="text" value={comment} onChange={this.handleValueChange.bind(this)} className="form-control reply-text" rows="1" placeholder="文明社会，理性评论"></textarea>
	                </div>
	            </form>
	    );
	}

	onClickReply(editing,event){
		this.setState({
			editing:editing,
		});

		event.stopPropagation();
	}
	
	createReplyButton(){

		return (<div className="reply-button">
	      <button type="button" onClick={this.onClickReply.bind(this,true)} className="btn btn-link btn-sm">Reply</button>
	    </div>);
	}

	render(){
		let editing = this.state.editing;
		let replyButton,replyForm;
		if(editing){
			replyForm = this.createReplyForm();
		}else{
			replyButton = this.createReplyButton();
		}

		return (
			<div className="comments-item">
			  <div className="pull-left">
			      <i className="fontSize18 fa fa-user-circle"></i>
			  </div>
			  <div className="comments-container">
				  {this.createCommentUser()}
				  {this.createCommentReplyList()}
				  {replyButton}
				  {replyForm}
			  </div>
			</div>
			);
	}
}