import React from 'react';
import 'whatwg-fetch';

export default class EditCommentControl extends React.Component{

	constructor(props){
		super(props);
		this.state={
			value:'',
			status:'',
			message:'',
		};
		this.handleValueChange = this.handleValueChange.bind(this);

	}

	handleValueChange(event){
		this.setState({
			value:event.target.value,
		});
	}

	handleSubmit(event){
		fetch(this.props.action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			body: JSON.stringify({
				comment: this.state.value
			})
		}).then(response => response.json()).then(data => {
			if(data.status=='200'){
				this.setState({
					status:'success'
				});
			}else{
				this.setState({
					status:'error',
					message:data.message,
				});
			}
		});

		event.preventDefault();
	}

	render(){
		let {value,status,message} = this.state;
		let action=this.props.action;
		let msg;
		if(status==='error'){
			msg =(<div className="alert alert-danger" role="alert">{message}</div>);
		}else if(status==='success'){
			msg =(<div className="alert alert-success" ref={()=>{
				let tid = setTimeout(()=>{
					clearTimeout(tid);
					this.setState({
						status:'',
					});
				},1000);
			}} role="alert">Comment has Submited</div>);
		}

		return (
			<div className="comment-box">
				 <div className="pull-left">
				     <i className="fa fa-user-circle"></i>
				 </div>
				 <div className="comment-content">
				   <form onSubmit={this.handleSubmit.bind(this)}>
				   	<div className="form-group">
				     <textarea className="form-control" value={value} onChange={this.handleValueChange} name="comment" rows="5"></textarea>
				     </div>
				     <div className="mt-1 text-right">
						{msg}	
				      <button className="btn btn-primary">Submit</button>
				     </div>
				   </form>
				 </div>
			</div>
			);
	}
}