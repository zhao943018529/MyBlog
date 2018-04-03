import React from "react";
import {
	fetch_articles_success,
	fetch_articles_start,
	fetch_articles_error} from 'reducers/ArticleReducer';

export default class HomeView extends React.Component {

	constructor(props){
		super(props);

		this.state={
			currentPage:1,
		};
	}

	componentDidMount(){
		this.props.createRequest('/article/getSummary/'+this.state.currentPage,
				{
					start:fetch_articles_start,
					success:fetch_articles_success,
					failed:fetch_articles_error,
				}
			);
	}

	createArticleItems(){
		let {articles} = this.props.articles;

		let articleItems = articles.map(article=>this.createArticle(article));

		return (<div className="article-list">
				{articleItems}
			</div>);
	}

	createArticle(article){
		let tags = article.tags.map(tag=>(<li className=""><a href="#" className="tag">{tag.name}</a></li>));

		return (<div className="article-item">
		  <h4 className="article-title mr-2">
		    <a target="_blank" href={"/article/detail/"+article.id}>{article.title}</a>
		  </h4>
		  <ul className="taglist-inline ib">
		    {tags}
		  </ul>
		</div>);
	}



	render() {
		let {status,message} = this.props.articles;
		let content;
		if(status==='success'){
			content= this.createArticleItems();
		}else if(status==='fetching'){
			
			content=(<div>
				Loading....
			</div>);
		}else{
			content=(<div className="alert alert-danger" role="alert">
 						{message}
					</div>);
		}

		return (
			<div className="container">
			  	{content}
			</div>
		);
	}
}
