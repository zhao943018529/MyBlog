import {connect} from 'react-redux';
import AddBlogView from '../components/AddBlogView';

const mapStateToProps = (state)=>({
	blog:state.blog
});

export default connect(mapStateToProps)(AddBlogView);