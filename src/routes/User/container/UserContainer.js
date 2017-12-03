import {connect} from 'react-redux';
import UserView from '../components/UserView';

const mapStateToProps = (state)=>({
	user:state.user
});

export default connect(mapStateToProps)(UserView);