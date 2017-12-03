import {connect} from 'react-redux';
import HomeView from '../components/HomeView';

const mapStateToProps = (state)=>({
	home:state.home
});

export default connect(mapStateToProps)(HomeView);