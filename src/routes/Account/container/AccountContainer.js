import {connect} from 'react-redux';
import AccountView from '../components/AccountView';

const mapStateToProps = (state)=>({
	account:state.account
});

export default connect(mapStateToProps)(AccountView);