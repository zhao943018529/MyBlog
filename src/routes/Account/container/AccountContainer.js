import {connect} from 'react-redux';
import AccountView from '../components/AccountView';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = state=>({
	login:state.login
})

const mapDispatchToProps = dispatch=>({
	actions:bindActionCreators({
		push:push
	},dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(AccountView);