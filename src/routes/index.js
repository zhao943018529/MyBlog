import Layout from '../components/Layout';
import Home from './Home';
import Account from './Account';
import PageNotFound from './PageNotFound';
import redirect from './PageNotFound/redirect';
import Register from './Register';
import Login from './Login';
export const createRoutes = (store)=>({
	path:'/',
	component:Layout,
	indexRoute:Home(store),
	childRoutes:[
		Home(store),
		Account(store),
		Register(store),
		Login(store),
		PageNotFound(),
		redirect
	]
});

export default createRoutes;