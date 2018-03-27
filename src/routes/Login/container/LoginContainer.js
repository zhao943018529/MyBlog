import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import LoginView from '../components/LoginView';
import createRequest from "../../../reducers/request";

const mapStateToProps = state=>({
	login:state.login,
	user:state.user
})

const mapPropsToDispatch = {
		push: push,
		createRequest
	};

export default connect(mapStateToProps,mapPropsToDispatch)(LoginView);