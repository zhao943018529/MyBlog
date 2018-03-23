import {connect} from 'react-redux';
import TagManageView from '../components/TagManageView';

const mapStateToProps = (state)=>({
	tags:state.tags
});

export default connect(mapStateToProps)(TagManageView);