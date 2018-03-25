import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import LoginView from '../components/LoginView';
import createRequest from '../../../reducers/request';
import {submit_success,submit_start,submit_error} from '../../../reducers/SubmitReducer';

const mapStateToProps = state=>({
	login:state.login,
	user:state.user
})

const mapPropsToDispatch = dispatch => ({
	actions: bindActionCreators({
		push: push,
		submit_success,
		submit_start,
		submit_error,
		createRequest
	}, dispatch)
});

export default connect(mapStateToProps,mapPropsToDispatch)(LoginView);