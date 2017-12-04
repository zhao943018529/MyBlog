import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import RegisterView from '../components/RegisterView';

const mapPropsToDispatch = dispatch=>({
	actions:bindActionCreators({push:push},dispatch)
})

export default connect(undefined,mapPropsToDispatch)(RegisterView);