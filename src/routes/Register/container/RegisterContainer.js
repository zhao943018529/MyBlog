import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import RegisterView from '../components/RegisterView';
import createRequest from '../../../reducers/request';

const mapStateToProps = state=>({
	register:state.register
})

const mapPropsToDispatch = {
		push: push,
	};

export default connect(mapStateToProps,mapPropsToDispatch)(RegisterView);