import {connect} from 'react-redux';
import TagManageView from '../components/TagManageView';
import {bindActionCreators} from 'redux';
import createRequest from '../../../../../reducers/request';


const mapStateToProps = (state)=>({
	tag:state.tag
});

const mapPropsToDispatch = {
		createRequest
	};

export default connect(mapStateToProps, mapPropsToDispatch)(TagManageView);