import Layout from '../components/Layout';
import Home from './Home';
import User from './User';


export const createRoutes = (store)=>({
	path:'/',
	component:Layout,
	indexRoute:Home(store),
	childRoutes:[
		Home(store),
		User(store)
	]
});

export default createRoutes;