import Layout from '../components/Layout';
import Home from './Home';
import User from './User';
import PageNotFound from './PageNotFound';
import redirect from './PageNotFound/redirect';
import Register from './Register';
export const createRoutes = (store)=>({
	path:'/',
	component:Layout,
	indexRoute:Home(store),
	childRoutes:[
		Home(store),
		User(store),
		Register(store),
		PageNotFound(),
		redirect
	]
});

export default createRoutes;