import {connect} from 'react-redux';
import HomeView from '../components/HomeView';
import createRequest from "reducers/request";

const mapStateToProps = (state)=>({
	home:state.home,
	articles:state.articles,
});

const mapPropsToDispatch = {
		createRequest
	};

export default connect(mapStateToProps,mapPropsToDispatch)(HomeView);