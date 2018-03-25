import {connect} from 'react-redux';
import TagManageView from '../components/TagManageView';
import {bindActionCreators} from 'redux';
import createRequest from '../../../../../reducers/request';
import {fetch_tags_success,
	fetch_tags_start,
	fetch_tags_error,
	add_tag_success,
	add_tag_error} from '../../../../../reducers/TagReducer';

const mapStateToProps = (state)=>({
	tag:state.tag
});

const mapPropsToDispatch = dispatch => ({
	actions: bindActionCreators({
		fetch_tags_success,
		fetch_tags_start,
		fetch_tags_error,
		add_tag_success,
		add_tag_error,
		createRequest
	}, dispatch)
});

export default connect(mapStateToProps, mapPropsToDispatch)(TagManageView);