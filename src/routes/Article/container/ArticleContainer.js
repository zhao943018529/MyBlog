import {connect} from 'react-redux';
import ArticleView from '../components/ArticleView';
import createRequest from "reducers/request";
import {push} from 'react-router-redux';

const mapStateToProps = (state)=>({
	user:state.user,
});

const mapPropsToDispatch = {
		push: push,
	};

export default connect(mapStateToProps,mapPropsToDispatch)(ArticleView);