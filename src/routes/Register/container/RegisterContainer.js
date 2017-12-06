import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import RegisterView from '../components/RegisterView';
import createRequest from '../../../reducers/request';
import {submit_success,submit_start,submit_error} from '../../../reducers/SubmitReducer';

const mapStateToProps = state=>({
	register:state.register
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

export default connect(mapStateToProps,mapPropsToDispatch)(RegisterView);